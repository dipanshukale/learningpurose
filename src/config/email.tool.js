import { tool } from "@langchain/core/tools";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

// Debug: Verify env variables are loaded
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "MISSING ❌");

// Track email count
let emailCount = 0;
const MAX_EMAILS = 500; // Gmail free tier daily limit

// Create transporter once (reuse for multiple sends)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password from Google Account
  }
});

// Helper: delay between emails to avoid rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Send to a single recipient
async function sendSingleEmail({ to, subject, message }) {
  const info = await transporter.sendMail({
    from: `"Email Bot" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message
  });

  emailCount++;
  console.log(`✅ Email sent to ${to} | Message ID: ${info.messageId}`);

  return {
    to,
    status: "success",
    messageId: info.messageId
  };
}

// Main function: Send to multiple recipients
async function sendMultipleEmails({ recipients, subject, message, delayMs = 1000 }) {

  // Verify SMTP connection first
  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified");
  } catch (verifyError) {
    console.error("❌ SMTP verification failed:", verifyError.message);
    return {
      tool: "send_email",
      status: "error",
      message: `SMTP connection failed: ${verifyError.message}`
    };
  }

  // Check daily limit
  if (emailCount >= MAX_EMAILS) {
    return {
      tool: "send_email",
      status: "error",
      message: `Daily email limit of ${MAX_EMAILS} reached`
    };
  }

  // Check if recipients list is empty
  if (!recipients || recipients.length === 0) {
    return {
      tool: "send_email",
      status: "error",
      message: "No recipients provided"
    };
  }

  console.log(`📧 Starting to send emails to ${recipients.length} recipients...`);

  const results = {
    total: recipients.length,
    successful: [],
    failed: [],
    skipped: []
  };

  // Loop through each recipient
  for (let i = 0; i < recipients.length; i++) {
    const to = recipients[i];

    // Stop if daily limit reached mid-loop
    if (emailCount >= MAX_EMAILS) {
      console.warn(`⚠️ Daily limit reached. Skipping remaining ${recipients.length - i} emails`);
      results.skipped.push(...recipients.slice(i));
      break;
    }

    try {
      const result = await sendSingleEmail({ to, subject, message });
      results.successful.push(result);
    } catch (error) {
      console.error(`❌ Failed to send to ${to}:`, error.message);
      results.failed.push({ to, error: error.message });
    }

    // Add delay between emails (except after last one)
    if (i < recipients.length - 1) {
      console.log(`⏳ Waiting ${delayMs}ms before next email...`);
      await delay(delayMs);
    }
  }

  // Final summary log
  console.log("\n📊 Email Sending Summary:");
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⏭️ Skipped: ${results.skipped.length}`);

  return {
    tool: "send_email",
    status: "completed",
    summary: {
      total: results.total,
      successful: results.successful.length,
      failed: results.failed.length,
      skipped: results.skipped.length
    },
    details: results
  };
}

// LangChain Tool Export
export const emailTool = tool(
  async ({ recipients, subject, message, delayMs }) => {
    return await sendMultipleEmails({ recipients, subject, message, delayMs });
  },
  {
    name: "send_email",
    description: "Send emails to multiple recipients at once",
    schema: z.object({
      recipients: z
        .array(z.string().email())
        .min(1)
        .describe("List of recipient email addresses"),
      subject: z.string().describe("Subject of the email"),
      message: z.string().describe("Body of the email"),
      delayMs: z
        .number()
        .optional()
        .default(1000)
        .describe("Delay in milliseconds between each email (default: 1000ms)")
    })
  }
);
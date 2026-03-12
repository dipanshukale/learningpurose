import { tool } from "@langchain/core/tools";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

let emailSent = false;

async function sendEmail({ to, subject, message }) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  if (emailSent) {
    return {
      tool: "send_email",
      status: "skipped",
      message: "Email already sent"
    };
  }

  emailSent = true;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  });

  return {
    tool: "send_email",
    status: "success",
    message: `Email sent successfully to ${to}`
  };
}

export const emailTool = tool(
  async ({ to, subject, message }) => {
    return await sendEmail({ to, subject, message });
  },
  {
    name: "send_email",
    description: "Send an email to a recipient",
    schema: z.object({
      to: z.string().describe("Recipient email address"),
      subject: z.string().describe("Subject of the email"),
      message: z.string().describe("Body of the email")
    })
  }
);
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import  User  from "../models/user.model.js";

export const getUserCountTool = tool(
  async () => {
    const count = await User.countDocuments();
    return `Total registered users: ${count}`;
  },
  {
    name: "get_user_count",
    description: "Get total number of registered users",
    schema: z.object({}),
  }
);
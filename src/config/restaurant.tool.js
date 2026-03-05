import { tool } from "@langchain/core/tools";
import { z } from "zod";
import Restaurant from "../models/restaurant.model.js";

export const getRestaurantInfo = tool(
  async () => {
    const r = await Restaurant.findOne({ isActive: true });
    if (!r) return "No active restaurant found.";
    return r;
  },
  {
    name: "get_restaurant_info",
    description: "Returns active restaurant details",
    schema: z.object({}),
  }
);
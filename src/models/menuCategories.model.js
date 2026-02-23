import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    image: {
      type: String, // category banner/icon
      default: "",
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate category names per restaurant
menuCategorySchema.index(
  { restaurantId: 1, name: 1 },
  { unique: true }
);

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

export default MenuCategory;
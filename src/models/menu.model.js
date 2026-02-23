import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String, // Cloudinary/S3 URL
      default: "",
    },

    isVeg: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    preparationTime: {
      type: Number, // minutes
      default: 10,
    },

    tags: [
      {
        type: String, // spicy, popular, chef-special
        trim: true,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false, // highlight on menu
    },
  },
  {
    timestamps: true,
  }
);

// Unique item name per category per restaurant
menuItemSchema.index(
  { restaurantId: 1, categoryId: 1, name: 1 },
  { unique: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
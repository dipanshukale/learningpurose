import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";

export const findRestaurantInfo = async () => {
  const restaurant = await Restaurant.findOne({ isActive: true });

  if (!restaurant) {
    throw new ApiError(400, "restaurant not details not found");
  }

  const {
    name = "N/A",
    description = "N/A",
    phone = "N/A",
    email = "N/A",
    address = {},
    openingHours = {},
  } = restaurant;

    const fullAddress = [
        address.street,
        address.city,
        address.state,
        address.postalCode,
        address.country,
    ]
        .filter(Boolean)
        .join(", ");

        const hours =
            openingHours.open && openingHours.close
            ? `${openingHours.open} - ${openingHours.close}`
            : "N/A";

        return `
        Restaurant Name: ${name}
        Description: ${description}
        Phone: ${phone}
        Email: ${email}
        Address: ${fullAddress || "N/A"}
        Opening Hours: ${hours}
        `.trim();
};

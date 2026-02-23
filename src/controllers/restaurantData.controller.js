import asyncHandler from "../utils/asynchandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as restaurantServices from "../services/restaurant.service.js"

export const createRestaurant = asyncHandler(async (req,res)=> {
    const  data = req.body;

    console.log(data);

    const restaurant = await restaurantServices.createRestaurantService(data);
    res.status(201).json(new ApiResponse(201,restaurant,"Restaurant Created Successfully"));
});

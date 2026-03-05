import Restaurant from "../models/restaurant.model.js";
import ApiError from "../utils/ApiError.js";
import { getVectorStore } from "./vector.service.js";
import { Document } from "@langchain/core/documents";

export const createRestaurantService = async(data) => {

    if(!data?.name || !data?.name?.trim().length === 0){
        throw new ApiError(400,"Restaurant name is required");
    };

    if(!data.email && !/^\S+@\S+\.\S+$/.test(data.email)){
        throw new ApiError(400,"Email is required");
    };

    if(!data.description?.trim()){
        throw new ApiError(400,"description is required");
    }

    if (!data.phone?.trim()) {
        throw new ApiError(400, "Phone is required");
    }

    if (!data.address || !data.address.city) {
        throw new ApiError(400, "Address city is required");
    }

    if(data.openingHours){
        const {open, close} = data.openingHours;
        if(!open || !close) throw new ApiError(400,"opening hours required");
    };

    const restaurant = await Restaurant.create(data);
    console.log(restaurant);


    const content = `
        Name: ${restaurant.name}
        Phone: ${restaurant.phone}
        Address: ${restaurant.address}
        Description: ${restaurant.description}
    `;

    const vectorStore = await getVectorStore();
    await vectorStore.addDocuments([
        new Document({
            pageContent:content,
            metadata:{restaurantId:restaurant._id.toString()}
        }),
    ]);
    console.log(vectorStore);
    return restaurant;
};


import { globlStore } from "../utils/globalData.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getLastData = (req,res) => {
    res.status(200).json(new ApiResponse(205,globlStore.lastData,"ai response"));
}
import multer from "multer";

const storage = multer.memoryStorage();
export const uploadFileMiddleware = multer({storage});


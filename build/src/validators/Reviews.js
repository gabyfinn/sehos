"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const zod_1 = require("zod");
exports.ReviewSchema = zod_1.z.object({
    id_user: zod_1.z.number().positive(),
    id_product: zod_1.z.number().positive(),
    review: zod_1.z.string().min(5, "The min characters is 5"),
    rate: zod_1.z.number().min(0, "The min rate is 0").max(5, "The max rate is 5"),
    /*   date: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg)
      return
    }, z.date()), */
});

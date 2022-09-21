"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const Reviews_1 = require("../controllers/Reviews");
const userExtractor_1 = require("../middleware/userExtractor");
const Reviews_2 = require("../validators/Reviews");
const Reviews = (0, express_1.Router)();
Reviews.get("/product/:id_product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_product } = req.params;
        const reviewsDB = yield (0, Reviews_1.getReviewsProduct)(parseInt(id_product));
        return res.json(reviewsDB);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
Reviews.get("/user/:id_user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user } = req.params;
        const result = yield (0, Reviews_1.getReviewsUser)(parseInt(id_user));
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}));
Reviews.post("/", userExtractor_1.userExtractorUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.rate = Number(req.body.rate);
        req.body.id_product = Number(req.body.id_product);
        const result = Reviews_2.ReviewSchema.parse(req.body);
        const response = yield (0, Reviews_1.postReview)(result);
        return res.json(response);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError)
            return res.status(500).json(error.issues.map((issue) => ({ message: issue.message })));
    }
    return;
}));
Reviews.delete("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user, id_product } = req.body;
        const response = yield (0, Reviews_1.deleteReview)(id_user, id_product);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
}));
/* Reviews.patch("/", async (req: Request, res: Response, next: NextFunction) => {})
 */
exports.default = Reviews;

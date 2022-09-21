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
exports.deleteReview = exports.patchReview = exports.postReview = exports.getReviewsUser = exports.getReviewsProduct = void 0;
const db_1 = require("../db");
const getReviewsProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findReviews = yield db_1.Reviews.findAll({
            include: [{ model: db_1.Users, attributes: [["name", "first_name"], "last_name", "username"] }],
            // include: [{ model: Users, attributes: ["name", "last_name", "username"] }],
            // include: [{ model: Users, attributes: { exclude: ["id"] } }],
            where: {
                id_product: productId,
            },
        });
        if (findReviews.length)
            return findReviews;
        else
            throw new Error("The are no reviews for this product.");
    }
    catch (error) {
        return error;
    }
});
exports.getReviewsProduct = getReviewsProduct;
const getReviewsUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findReviews = yield db_1.Reviews.findAll({
            where: {
                id_user: userId,
            },
        });
        if (findReviews)
            return findReviews;
        else
            return;
    }
    catch (error) {
        return error;
    }
});
exports.getReviewsUser = getReviewsUser;
const postReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReview = yield db_1.Reviews.create(review);
        return newReview;
    }
    catch (error) {
        return error;
    }
    // Si ya existe
    /*   try {
      const { id_product, id_user } = review
      const finOne = await Reviews.findOne({
        where: {
          id_product: id_product,
          id_user: id_user,
          isActive: true,
        },
      })
      if (finOne) return new Error("There is already a review for this product")
    } catch (error) {
      return error
    } */
});
exports.postReview = postReview;
const patchReview = () => { };
exports.patchReview = patchReview;
const deleteReview = (id_user, id_product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReview = yield db_1.Reviews.findOne({ where: { id_product: id_product, id_user: id_user } });
        const res = deletedReview;
        yield (deletedReview === null || deletedReview === void 0 ? void 0 : deletedReview.destroy());
        return res;
    }
    catch (error) {
        return error;
    }
});
exports.deleteReview = deleteReview;

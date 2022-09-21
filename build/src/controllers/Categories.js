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
exports.deleteCategory = exports.patchCategory = exports.postCategory = exports.getCategories = void 0;
const db_1 = require("../db");
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db_1.Category.findAll({ where: { isActive: true } });
    if (categories.length > 0) {
        return categories;
    }
    else {
        throw new Error(`there's not any category`);
    }
});
exports.getCategories = getCategories;
const postCategory = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value[0].hasOwnProperty('category')) {
            try {
                return yield db_1.Category.bulkCreate(value);
            }
            catch (error) {
                return { message: "Please try not to type info that already exists. Verify" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: [{'category':'category'}] || {'category':'category'}" };
        }
    }
    else if (Object.prototype.toString.call(value) === '[object Object]') {
        if (value.hasOwnProperty('category')) {
            try {
                return yield db_1.Category.create(value);
            }
            catch (error) {
                return { message: "Please try not to type info that already exists. Verify" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: [{'category':'category'}] || {'category':'category'}" };
        }
    }
    return { message: "Verify data." };
});
exports.postCategory = postCategory;
const patchCategory = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const findedCategory = yield db_1.Category.findByPk(value.id);
    if (findedCategory.category == value.update) {
        throw new Error(`The category is already named as ${value.update}`);
    }
    else {
        findedCategory.category = value.update;
        yield findedCategory.save();
    }
    return findedCategory;
});
exports.patchCategory = patchCategory;
const deleteCategory = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield db_1.Category.findByPk(value.id);
    if (deletedCategory.isActive == false) {
        throw new Error(`The category ${value.category} is already 'deleted'`);
    }
    else {
        deletedCategory.isActive = false;
        yield deletedCategory.save();
    }
    return deletedCategory;
});
exports.deleteCategory = deleteCategory;

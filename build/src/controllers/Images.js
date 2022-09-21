'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImages = exports.updateImages = exports.createImages = exports.getImagesAll = exports.getImages = exports.subirImagen = void 0;
// se requiere el models
const db_1 = require("../db");
const cloudinary_1 = require("../utils/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
function subirImagen(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, cloudinary_1.uploadImage)(params);
        yield fs_extra_1.default.unlink(params);
        if (result) {
            const value = {
                id: result.public_id,
                image: result.url
            };
            return value;
        }
        else {
            return {};
        }
    });
}
exports.subirImagen = subirImagen;
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las imagenes para los productos
    var images = yield db_1.Images.findAll({ where: { isActive: true } });
    return images.length > 0 ? images : { message: "There's not any images for the product." };
});
exports.getImages = getImages;
const getImagesAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las imagenes para los productos
    var images = yield db_1.Images.findAll();
    return images.length > 0 ? images : { message: "There's not any images for the product." };
});
exports.getImagesAll = getImagesAll;
const createImages = (value, details) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (Object.prototype.toString.call((_a = value.files) === null || _a === void 0 ? void 0 : _a.image) === '[object Array]') {
        if ((_b = value.files) === null || _b === void 0 ? void 0 : _b.image[0].hasOwnProperty('tempFilePath')) {
            try {
                for (var vImage of (_c = value.files) === null || _c === void 0 ? void 0 : _c.image) {
                    console.log(details);
                    yield details.createImage(yield subirImagen(vImage.tempFilePath));
                }
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            return { message: "Verifique si la key de los objetos sea [image]" };
        }
    }
    else if (Object.prototype.toString.call(value.files) === '[object Object]') {
        if (value.files.image.hasOwnProperty('tempFilePath')) {
            try {
                yield details.createImage(yield subirImagen(value.files.image.tempFilePath));
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            return { message: "Verifique si la key de los objetos sea [image]" };
        }
    }
});
exports.createImages = createImages;
const updateImages = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var imagesByID = yield db_1.Images.findByPk(value.id);
    var imagesDuplicate = yield db_1.Images.findAll({ where: { image: String(value.image) } });
    if (imagesByID !== null) {
        if (imagesDuplicate.length > 0) {
            return { message: `The image already exists` };
        }
        imagesByID.set(value);
        yield imagesByID.save();
        return imagesByID;
    }
    return { message: `We couldn't find the image with ID: ${value.id}.` };
});
exports.updateImages = updateImages;
const deleteImages = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var imagesByID = yield db_1.Images.findByPk(id);
    if (imagesByID !== null) {
        if (imagesByID.isActive) {
            imagesByID.isActive = false;
            yield imagesByID.save();
            return imagesByID;
        }
        return { message: `the product image with id: ${id} is already 'deleted'` };
    }
    return { message: `We couldn't find the image with ID: ${id}` };
});
exports.deleteImages = deleteImages;

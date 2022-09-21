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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarrousel = exports.updateCarrousel = exports.createCarrousel = exports.getCarrouselAll = exports.getCarrousel = void 0;
// se requiere el models
const db_1 = require("../db");
const getCarrousel = () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
    var imagesCarrousel = yield db_1.Carrousel.findAll({ where: { isActive: true } });
    return imagesCarrousel.length > 0 ? imagesCarrousel : { message: "There's not any images for carrousel" };
});
exports.getCarrousel = getCarrousel;
const getCarrouselAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // TODO => Lista de todas las imagenes activas y desactivadas [Slider] (isActive=true y isActive=false)
    var imagesCarrouselAll = yield db_1.Carrousel.findAll();
    return imagesCarrouselAll.length > 0 ? imagesCarrouselAll : { message: "There's not any images for carrousel" };
});
exports.getCarrouselAll = getCarrouselAll;
const createCarrousel = (value) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value[0].hasOwnProperty('image')) {
            try {
                return yield db_1.Carrousel.bulkCreate(value);
            }
            catch (error) {
                return { message: "Please try not to type info that already exists. Verify" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: [{'image':'url_image'}] || {'image':'url_image'}" };
        }
    }
    else if (Object.prototype.toString.call(value) === '[object Object]') {
        if (value.hasOwnProperty('image')) {
            try {
                return yield db_1.Carrousel.create(value);
            }
            catch (error) {
                return { message: "Please try not to type info that already exists. Verify" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g:: [{'image':'url_image'}] || {'image':'url_image'}" };
        }
    }
});
exports.createCarrousel = createCarrousel;
const updateCarrousel = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var carrouselByID = yield db_1.Carrousel.findByPk(value.id);
    var carrouselDuplicate = yield db_1.Carrousel.findAll({ where: { image: String(value.image) } });
    if (carrouselByID !== null) {
        if (carrouselDuplicate.length > 0) {
            return { message: `The carrousel image for, already exists` };
        }
        carrouselByID.set(value);
        yield carrouselByID.save();
        return carrouselByID;
    }
    return { message: `We could't find image for the id: ${value.id}.` };
});
exports.updateCarrousel = updateCarrousel;
const deleteCarrousel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var carrouselByID = yield db_1.Carrousel.findByPk(id);
    if (carrouselByID !== null) {
        if (carrouselByID.isActive) {
            carrouselByID.isActive = false;
            yield carrouselByID.save();
            return carrouselByID;
        }
        return { message: `The carrousel image for the id: ${id} is already deleted` };
    }
    return { message: `We could't find image for the id: ${id}.` };
});
exports.deleteCarrousel = deleteCarrousel;

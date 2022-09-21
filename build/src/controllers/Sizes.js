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
exports.deleteSize = exports.updateSize = exports.createSize = exports.getSizeAll = exports.getSize = void 0;
const db_1 = require("../db");
const getSize = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las tallas
    var size = yield db_1.Sizes.findAll({ where: { isActive: true } });
    return size.length > 0 ? size : { message: "Sizes not found." };
});
exports.getSize = getSize;
const getSizeAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las tallas
    var size = yield db_1.Sizes.findAll();
    return size.length > 0 ? size : { message: "Sizes not found." };
});
exports.getSizeAll = getSizeAll;
const createSize = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value[0].hasOwnProperty('size')) {
            try {
                return yield db_1.Sizes.bulkCreate(value);
            }
            catch (error) {
                return { message: "please don't try to insert exist data,verify." };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g:  [{'size':'talla'}] || {'size':'talla'}" };
        }
    }
    else if (Object.prototype.toString.call(value) === '[object Object]') {
        if (value.hasOwnProperty('size')) {
            try {
                return yield db_1.Sizes.create(value);
            }
            catch (error) {
                return { message: "please don't try to insert exist data,verify." };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: : [{'size':'talla'}] || {'size':'talla'}" };
        }
    }
});
exports.createSize = createSize;
const updateSize = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var sizeByID = yield db_1.Sizes.findByPk(value.id);
    var sizeDuplicate = yield db_1.Sizes.findAll({ where: { size: String(value.size) } });
    if (sizeByID !== null) {
        if (sizeDuplicate.length > 0) {
            return { message: `Talla ya existente.` };
        }
        sizeByID.set(value);
        yield sizeByID.save();
        return sizeByID;
    }
    return { message: `Not Found size by ID ${value.id}.` };
});
exports.updateSize = updateSize;
const deleteSize = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var sizeByID = yield db_1.Sizes.findByPk(id);
    if (sizeByID !== null) {
        if (sizeByID.isActive) {
            sizeByID.isActive = false;
            yield sizeByID.save();
            return sizeByID;
        }
        return { message: `the size with ID: ${id} is already 'deleted'` };
    }
    return { message: `we couldn't find the size with id: ${id}` };
});
exports.deleteSize = deleteSize;

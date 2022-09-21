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
exports.deleteColor = exports.updateColor = exports.createColor = exports.getColorAll = exports.getColor = void 0;
// se requiere el models
const db_1 = require("../db");
const getColor = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las imagenes para los productos
    var color = yield db_1.Color.findAll({ where: { isActive: true } });
    return color.length > 0 ? color : { message: "there aren't any colors registered" };
});
exports.getColor = getColor;
const getColorAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las imagenes para los productos
    var color = yield db_1.Color.findAll();
    return color.length > 0 ? color : { message: "No hay colores registrados." };
});
exports.getColorAll = getColorAll;
const createColor = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    if (Object.prototype.toString.call(value) === '[object Array]') {
        if (value[0].hasOwnProperty('color')) {
            try {
                return yield db_1.Color.bulkCreate(value);
            }
            catch (error) {
                return { message: "Please check if there's no repeated color" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: [{'color':'color'}] || {'color':'color'}" };
        }
    }
    else if (Object.prototype.toString.call(value) === '[object Object]') {
        if (value.hasOwnProperty('color')) {
            try {
                return yield db_1.Color.create(value);
            }
            catch (error) {
                return { message: "Please verify if that color is not already created" };
            }
        }
        else {
            return { message: "Please, verify the object key, e. g: [{'color':'color'}] || {'color':'color'}" };
        }
    }
});
exports.createColor = createColor;
const updateColor = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var colorByID = yield db_1.Color.findByPk(value.id);
    var colorDuplicate = yield db_1.Color.findAll({ where: { color: String(value.color) } });
    if (colorByID !== null) {
        if (colorDuplicate.length > 0) {
            return { message: `The color already exists.` };
        }
        colorByID.set(value);
        yield colorByID.save();
        return colorByID;
    }
    return { message: `We couldn't find the color with ID: ${value.id}.` };
});
exports.updateColor = updateColor;
const deleteColor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var colorByID = yield db_1.Color.findByPk(id);
    if (colorByID !== null) {
        if (colorByID.isActive) {
            colorByID.isActive = false;
            yield colorByID.save();
            return colorByID;
        }
        return { message: `The color with id ${id} is already deleted` };
    }
    return { message: `We couldn't find the color with ID: ${id}` };
});
exports.deleteColor = deleteColor;

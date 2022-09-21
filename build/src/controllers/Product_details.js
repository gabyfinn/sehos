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
exports.deleteP_Details = exports.updateP_Details = exports.createP_Details = exports.getP_Details = void 0;
// se requiere el models
const db_1 = require("../db");
const getP_Details = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las imagenes para el Slider
    var p_Detail = yield db_1.Product_details.findAll({ include: [db_1.Color, db_1.Images, db_1.Sizes] });
    return p_Detail.length > 0 ? p_Detail : { message: "There's no product details to show" };
});
exports.getP_Details = getP_Details;
const createP_Details = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    // si todo esta correcto crea una nueva talla.
    const nP_Details = yield db_1.Product_details.create(value);
    yield nP_Details.addImages(value.images);
    value.size.forEach((detail) => __awaiter(void 0, void 0, void 0, function* () {
        yield nP_Details.addSizes(detail.id, { through: { stock: detail.stock } });
    }));
    return nP_Details;
});
exports.createP_Details = createP_Details;
const updateP_Details = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var p_DetailByID = yield db_1.Product_details.findOne({
        where: {
            id_product: value.id
        }
    });
    if (p_DetailByID !== null) {
        p_DetailByID.set(value.details);
        yield p_DetailByID.save();
        return p_DetailByID;
    }
    return { message: `we couldn't find the product details for the id: ${value.id}.` };
});
exports.updateP_Details = updateP_Details;
const deleteP_Details = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var p_DetailByID = yield db_1.Product_details.findByPk(id);
    if (p_DetailByID !== null) {
        if (p_DetailByID.isActive) {
            p_DetailByID.isActive = false;
            yield p_DetailByID.save();
            return p_DetailByID;
        }
        return { message: `the product details with id: ${id} is already deleted` };
    }
    return { message: `we couldn't find the product details for the id: ${id}` };
});
exports.deleteP_Details = deleteP_Details;

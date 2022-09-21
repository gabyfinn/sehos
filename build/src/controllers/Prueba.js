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
exports.deleteAddress = exports.patchAddress = exports.postAddress = exports.getAddress = void 0;
const db_1 = require("../db");
//PATCH/address: enviar un objeto que contenga todos los datos de la direccion a editar
//junto con una propiedad llamada update: "la direccion". Ej: //! consultar si es conveniente pedir solo la direccion o un objeto con la direccion y el zip_code 
// 
// {...address,
// update:'Springfield 343'
//}
const getAddress = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddresses = yield db_1.Users.findByPk(id, { include: { model: db_1.Address } });
    if (!userAddresses.addresses.length && userAddresses) {
        throw new Error("there's no any saved address for the user id:" + id);
    }
    else if (!userAddresses) {
        throw new Error('the user with id:' + id + "doesn't exists");
    }
    else {
        return (userAddresses.addresses);
    }
});
exports.getAddress = getAddress;
const postAddress = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, zip_code } = body;
    const [newAddress, created] = yield db_1.Address.findOrCreate({
        where: {
            address: address,
            zip_code: zip_code
        }
    });
    const user = yield db_1.Users.findByPk(id);
    if (user && created) {
        yield user.addAddress(newAddress);
        const userAddresses = yield db_1.Users.findByPk(id, { include: { model: db_1.Address } });
        if (userAddresses) {
            return userAddresses;
        }
    }
    else if (!created) {
        throw new Error('the address' + newAddress.address + "already exists");
    }
    else if (!user) {
        throw new Error(`we couldn't find the user with id: ` + id);
    }
    throw new Error('An error has ocurred');
});
exports.postAddress = postAddress;
const patchAddress = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield db_1.Address.findByPk(value.id);
    if (address.address == value.update) {
        throw new Error(`please type another address`);
    }
    else {
        address.address = value.update;
        yield address.save();
    }
    return address;
});
exports.patchAddress = patchAddress;
const deleteAddress = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAddress = yield db_1.Address.findByPk(value.id);
    if (deletedAddress.isActive == false) {
        throw new Error(`${value.address} ya está 'eliminada'`);
    }
    else {
        deletedAddress.isActive = false;
        yield deletedAddress.save();
    }
    return deletedAddress;
});
exports.deleteAddress = deleteAddress;

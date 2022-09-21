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
    if (userAddresses) {
        return userAddresses.Addresses;
    }
    else {
        return [];
    }
});
exports.getAddress = getAddress;
const postAddress = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, zip_code, city, state, country, title } = body;
    const user = yield db_1.Users.findByPk(id);
    const newAddress = {
        id_user: id,
        title: title,
        address: address,
        city: city,
        state: state,
        country: country,
        zip_code: zip_code,
    };
    return yield user.createAddress(newAddress);
    /* const [newAddress, created]: any = await Address.findOrCreate({
      where: {
        id_user: id,
        title: title,
        address: address,
        city: city,
        state: state,
        country: country,
        zip_code: zip_code
      }
    }) */
    /* console.log("NewAddress:", newAddress)
    console.log("Created", created)
  
    if (user && created) {
      await user.addAddress(newAddress)
      const userAddresses = await Users.findByPk(id, { include: { model: Address } })
      if (userAddresses) {
        return userAddresses
      }
    } else if (!created) {
      throw new Error(`The address ${newAddress.address} already exists`);
    } else if (!user) {
      throw new Error(`We couldn't find user with id: ${id}`)
    }
    throw new Error('An error has ocurred') */
});
exports.postAddress = postAddress;
const patchAddress = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var address = yield db_1.Address.findByPk(value.id);
    if (address !== null) {
        if (address.address === value.address && address.zip_code === value.zip_code) {
            throw new Error(`Please type another address`);
        }
        address.set(value);
        yield address.save();
        return address;
    }
    throw new Error(`There's not any address with the id: ${value.id}`);
});
exports.patchAddress = patchAddress;
const deleteAddress = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAddress = yield db_1.Address.findByPk(value.id);
    yield (deletedAddress === null || deletedAddress === void 0 ? void 0 : deletedAddress.destroy());
    return { msg: "Done" };
});
exports.deleteAddress = deleteAddress;

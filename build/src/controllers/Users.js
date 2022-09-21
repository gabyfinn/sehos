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
exports.deleteFavourite = exports.addFavourites = exports.getFavourites = exports.allDeleteCart = exports.deleteCart = exports.updateCart = exports.addToCart = exports.getCart = exports.deleteUser = exports.updatePassword = exports.updateUser = exports.createUsers = exports.getAllValuesUsers = void 0;
const db_1 = require("../db");
const bcrypt = require("bcrypt");
const NotificationMail_1 = require("./NotificationMail");
function formatValueUsers(nObjUser) {
    return __awaiter(this, void 0, void 0, function* () {
        var Carrito = nObjUser.cart;
        var Favs = nObjUser.favs;
        var totalCarrito = 0;
        var arrayCarrito = [];
        nObjUser.cart = [];
        nObjUser.favs = [];
        if (Favs) {
            for (var vFavs of Favs) {
                //FAVORITOS
                var fValue = vFavs;
                var id_detailsF = fValue.favourite.id_product_details;
                var productoF = yield db_1.Products.findByPk(id_detailsF, { attributes: ['name', 'sell_price'] });
                var detailsF = yield db_1.Product_details.findByPk(id_detailsF, { include: [db_1.Images, db_1.Sizes, db_1.Color] });
                var productoPF = JSON.parse(JSON.stringify(productoF, null, 2));
                var detailsPF = JSON.parse(JSON.stringify(detailsF, null, 2));
                const newSizes = [];
                detailsPF.Sizes.forEach((s) => newSizes.push({ id: s.id, size: s.size, stock: s.Product_details_size.stock, isActive: s.isActive }));
                var nFavs = {
                    id_details: id_detailsF,
                    name: productoPF.name,
                    image: detailsPF.Images[0].image,
                    color: detailsPF.Color.color,
                    sizes: newSizes,
                    price: productoPF.sell_price,
                };
                nObjUser.favs.push(nFavs);
                //FAVORITOS
            }
        }
        if (Carrito) {
            for (var vCarrito of Carrito) {
                //CARRITO
                var cValue = vCarrito;
                var id_product = cValue.id_product;
                var id_detail = cValue.Cart_details.id_product_details;
                var quantity = cValue.Cart_details.quantity;
                var idSize = cValue.Cart_details.id_size;
                var producto = yield db_1.Products.findByPk(id_product, { attributes: ['name', 'sell_price'] });
                var details = yield db_1.Product_details.findByPk(id_detail, { include: [db_1.Images, db_1.Sizes, db_1.Color] });
                var productoP = JSON.parse(JSON.stringify(producto, null, 2));
                var detailsP = JSON.parse(JSON.stringify(details, null, 2));
                var sizes = detailsP.Sizes;
                var filterSize = sizes.find((el) => el.id === idSize);
                var formatedSize = {
                    id: filterSize.id,
                    size: filterSize.size,
                    stock: filterSize.Product_details_size.stock,
                };
                detailsP.Sizes = [];
                sizes.forEach((s) => detailsP.Sizes.push({ id: s.id, size: s.size, stock: s.Product_details_size.stock }));
                var carritoN = {
                    id_details: id_detail,
                    image: detailsP.Images[0].image,
                    name: productoP.name,
                    color: detailsP.Color.color,
                    size: detailsP.Sizes,
                    price: productoP.sell_price,
                    sizeCart: formatedSize,
                    quantity: quantity,
                };
                arrayCarrito.push(carritoN);
                totalCarrito += carritoN.price * carritoN.quantity;
                //CARRITO
            }
            nObjUser.cart = { arrayCarrito: arrayCarrito, totalCarrito: totalCarrito };
        }
        return nObjUser;
    });
}
function verificarUser(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var findUser = yield db_1.Users.findByPk(params);
        if (findUser) {
            return true;
        }
        else {
            throw new Error("No existe el usuario.");
        }
    });
}
function verificarProducto(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var findUser = yield db_1.Product_details.findByPk(params);
        if (findUser) {
            return true;
        }
        else {
            throw new Error("No existe el Producto.");
        }
    });
}
const getAllValuesUsers = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    var { id, username, email } = value;
    if (id) {
        let users = yield db_1.Users.findByPk(id, { include: ["cart", "favs"] });
        var nObjUser = JSON.parse(JSON.stringify(users, null, 2));
        if (nObjUser) {
            return yield formatValueUsers(nObjUser);
        }
        else {
            return { message: "we couldn't find user with id: " + id };
        }
    }
    else if (username) {
        let userName = yield db_1.Users.findOne({ where: { username: username }, include: ["cart", "favs"] });
        var nObjUser = JSON.parse(JSON.stringify(userName, null, 2));
        if (nObjUser) {
            return yield formatValueUsers(nObjUser);
        }
        else {
            return { message: "we couldn't find user with username:" + username };
        }
    }
    else if (email) {
        let userEmail = yield db_1.Users.findOne({ where: { email: email }, include: ["cart", "favs"] });
        var nObjUser = JSON.parse(JSON.stringify(userEmail, null, 2));
        if (nObjUser) {
            return yield formatValueUsers(nObjUser);
        }
        else {
            return { message: "there's no exist any user with the email: " + email };
        }
    }
    else {
        let users = yield db_1.Users.findAll();
        return users.length > 0 ? users : { message: "there're not users" };
    }
});
exports.getAllValuesUsers = getAllValuesUsers;
const createUsers = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt.hashSync(value.password, 10);
    value = Object.assign(Object.assign({}, value), { password: hashPassword });
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar nuevo usuario.
    var username = yield db_1.Users.findAll({ where: { username: value.username } });
    var email = yield db_1.Users.findAll({ where: { email: value.email } });
    var identification = yield db_1.Users.findAll({ where: { identification: value.identification } });
    // Agrega mensaje al objeto dependiendo de lo que falte.
    if (username.length > 0 || email.length > 0 || identification.length > 0) {
        let error = {};
        if (username.length > 0) {
            error.username = "the username already exists";
        }
        if (email.length > 0) {
            error.email = "the email already exists";
        }
        if (identification.length > 0) {
            error.identification = "The identification already exists";
        }
        return error;
    }
    var nUser = yield db_1.Users.create(value);
    (0, NotificationMail_1.send)(value.email, `Bienvenido a SEHOS STORE`, `Gracias por tu registro: ${value.name} ${value.last_name}`);
    return nUser;
});
exports.createUsers = createUsers;
const updateUser = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if ((_a = value.password) === null || _a === void 0 ? void 0 : _a.length) {
        const hashPassword = bcrypt.hashSync(value.password, 10);
        value = Object.assign(Object.assign({}, value), { password: hashPassword });
    }
    // Se busca el usuario por id
    var userByID = yield db_1.Users.findByPk(value.id);
    if (userByID !== null) {
        userByID.set(value);
        yield userByID.save();
        return userByID;
    }
    return { message: `we couldn't find user with id: ${value.id}` };
});
exports.updateUser = updateUser;
const updatePassword = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = bcrypt.hashSync(value.password, 10);
    value = Object.assign(Object.assign({}, value), { password: hashPassword });
    // Se busca el usuario por id
    var userByID = yield db_1.Users.findByPk(value.id);
    if (userByID !== null) {
        userByID.set(value);
        yield userByID.save();
        return userByID;
    }
    return { message: `we couldn't find user with id: ${value.id}` };
});
exports.updatePassword = updatePassword;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var userByID = yield db_1.Users.findByPk(id);
    if (userByID !== null) {
        if (userByID.isActive) {
            userByID.isActive = false;
            yield userByID.save();
            return userByID;
        }
        return { message: `the user with id: ${id} is already 'deleted'` };
    }
    return { message: `we couldn't find the user with id: ${id}` };
});
exports.deleteUser = deleteUser;
//!====================================================
//!===================CART_DETAILS=====================
//!====================================================
const getCart = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    const added = yield db_1.Users.findByPk(idUser, { include: ['cart'] });
    var nObjUser = JSON.parse(JSON.stringify(added));
    const userCart = yield formatValueUsers(nObjUser);
    return userCart.cart;
});
exports.getCart = getCart;
const addToCart = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    console.log(value);
    const { id_user, id_product_details, id_size, quantity } = value;
    yield verificarUser(id_user);
    yield verificarProducto(id_product_details);
    var findUser = yield db_1.Users.findByPk(id_user, { include: ['cart'] });
    yield findUser.addCart(id_product_details, { through: { quantity, id_size } });
    const added = yield db_1.Users.findByPk(id_user, { include: ['cart'] });
    var nObjUser = JSON.parse(JSON.stringify(added));
    const userCart = yield formatValueUsers(nObjUser);
    return userCart.cart;
});
exports.addToCart = addToCart;
const updateCart = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    const { id_user, id_product_details, quantity, id_size } = value;
    yield verificarUser(id_user);
    yield verificarProducto(id_product_details);
    if (quantity) {
        yield db_1.Cart_details.update({ quantity }, { where: { id_user: id_user, id_product_details: id_product_details } });
    }
    if (id_size) {
        const finded = yield db_1.Sizes.findByPk(id_size);
        if (finded)
            yield db_1.Cart_details.update({ id_size }, { where: { id_user: id_user, id_product_details: id_product_details } });
        else
            throw new Error('That size is not defined');
    }
    let users = yield db_1.Users.findByPk(id_user, { include: ['cart', 'favs'] });
    var nObjUser = JSON.parse(JSON.stringify(users));
    const userCart = yield formatValueUsers(nObjUser);
    return userCart.cart;
});
exports.updateCart = updateCart;
const deleteCart = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    yield verificarUser(value.id_user);
    yield verificarProducto(value.id_product_details);
    yield db_1.Cart_details.destroy({
        where: { id_user: value.id_user, id_product_details: value.id_product_details },
    });
    let findUser = yield db_1.Users.findByPk(value.id_user, { include: ['cart', 'favs'] });
    var nObjUser = JSON.parse(JSON.stringify(findUser, null, 2));
    const userCart = yield formatValueUsers(nObjUser);
    return userCart.cart;
});
exports.deleteCart = deleteCart;
const allDeleteCart = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    yield verificarUser(value.id_user);
    yield db_1.Cart_details.destroy({ where: { id_user: value.id_user } });
    let users = yield db_1.Users.findByPk(value.id_user, { include: ['cart'] });
    return users.cart;
});
exports.allDeleteCart = allDeleteCart;
//!====================================================
//!===================FAVORITOS========================
//!====================================================
const getFavourites = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    var userFinded = yield db_1.Users.findByPk(id, { include: "favs" });
    let messageError = '';
    if (!userFinded)
        messageError = "Don't found any user";
    if (!userFinded.favs)
        messageError = "Don't have any products yet";
    const userFavs = yield formatValueUsers(userFinded);
    return !messageError ? userFavs.favs : { message: messageError };
});
exports.getFavourites = getFavourites;
const addFavourites = (body) => __awaiter(void 0, void 0, void 0, function* () {
    var { id_user, id_product_details } = body;
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios"
    var userFinded = yield db_1.Users.findByPk(id_user);
    yield userFinded.addFavs(id_product_details);
    var userUpdated = yield db_1.Users.findByPk(id_user, { include: "favs" });
    const userFavs = yield formatValueUsers(userUpdated);
    return userFavs ? userFavs.favs : { message: "Don't have any products yet" };
});
exports.addFavourites = addFavourites;
const deleteFavourite = (body) => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
    var { id_user, id_product_details } = body;
    yield verificarUser(id_user);
    yield verificarProducto(id_product_details);
    var userFinded = yield db_1.Users.findByPk(id_user);
    yield userFinded.removeFavs(id_product_details);
    var userUpdated = yield db_1.Users.findByPk(id_user, { include: "favs" });
    const userFavs = yield formatValueUsers(userUpdated);
    return userFavs ? userFavs.favs : { message: "Don't have any products yet" };
});
exports.deleteFavourite = deleteFavourite;

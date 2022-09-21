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
exports.getOrdersUser = exports.deleteOrders = exports.updateOrders = exports.createOrders = exports.getOrders = void 0;
require("dotenv").config();
// se requiere el models
const db_1 = require("../db");
const STRIPE_TOKEN = process.env.STRIPE_TOKEN;
console.log("Stripe Token:", STRIPE_TOKEN);
const stripe = require("stripe")(STRIPE_TOKEN);
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    // Se trae todas las ordenes registradas incluyendo el usuario
    /* var orders = await Orders.findAll(
      {
        include: Users
      })
   */
    var orders = yield db_1.Orders.findAll({
        include: [
            {
                model: db_1.Users,
            },
            {
                model: db_1.Orders_details,
            },
        ],
    });
    return orders.length > 0 ? orders : { message: "There's no any order to show" };
});
exports.getOrders = getOrders;
const createOrders = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // si todo esta correcto crea una orden de compra
    const { id: id_user, idStripe: id, idAddress } = value;
    console.log(id);
    const user = yield db_1.Users.findByPk(id_user);
    let address = yield db_1.Address.findByPk(idAddress, { attributes: [["address", "address_user"]] });
    address = address === null || address === void 0 ? void 0 : address.toJSON();
    const carts = yield user.getCart_details({ attributes: { exclude: ["id_user"] } });
    /* console.log(carts) */
    let orders_details = [];
    let total_ammount = 0;
    for (const cart of carts) {
        let size = yield cart.getSize({ attributes: ["size"] });
        size = size.toJSON();
        const product_detail = yield cart.getProduct_detail({ attributes: ["id", "id_product", "id_color"] });
        let color = yield product_detail.getColor({ attributes: ["color"] });
        color = color.toJSON();
        let image = yield product_detail.getImages({ attributes: ["image"], joinTableAttributes: [] });
        image = image[0].toJSON();
        let product = yield db_1.Products.findByPk(product_detail.id_product, {
            attributes: [["id", "id_product"], "name", "gender", "season", ["sell_price", "price"]],
        });
        product = product === null || product === void 0 ? void 0 : product.toJSON();
        const order_detail = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, product), image), size), color), { quantity: cart.quantity });
        total_ammount = total_ammount + order_detail.price * order_detail.quantity;
        /* console.log(total_ammount) */
        orders_details.push(order_detail);
    }
    try {
        const amount = total_ammount * 100;
        const stripeParam = {
            currency: "USD",
            description: "Sehos Shop Purchase",
            payment_method: id,
            confirm: true,
            amount,
        };
        console.log("Stripe Param:", stripeParam);
        const paymentIntent = yield stripe.paymentIntents.create(stripeParam);
        console.log(paymentIntent);
        const order = Object.assign(Object.assign({ id_user }, address), { total_ammount, order_state: "Fulfilled" });
        /* console.log(order) */
        const orderCreate = yield db_1.Orders.create(order);
        for (const orderDetail of orders_details) {
            console.log("creando detalle", yield orderCreate.createOrders_detail(orderDetail));
        }
        for (const cart of carts) {
            const product_detail = yield cart.getProduct_detail({ attributes: ["id", "id_product", "id_color"] });
            const product_details_size = yield product_detail.getProduct_details_sizes({ where: { id_sizes: cart.id_size } });
            product_details_size[0].stock = product_details_size[0].stock - cart.quantity;
            yield product_details_size[0].save();
        }
        yield db_1.Cart_details.destroy({ where: { id_user: id_user } });
        return Object.assign(Object.assign({}, order), { orders_details });
    }
    catch (error) {
        console.log(error);
        console.log(error.message);
        console.log(error.raw.message);
        /* const order = {
          id_user,
          ...address,
          total_ammount,
          order_state: 'Rechazado',
          orders_details
        } */
        throw new Error(error.raw.message);
    }
});
exports.createOrders = createOrders;
const updateOrders = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    var carrouselByID = yield db_1.Orders.findByPk(value.id);
    var carrouselDuplicate = yield db_1.Orders.findAll({ where: { image: String(value.image) } });
    if (carrouselByID !== null) {
        if (carrouselDuplicate.length > 0) {
            return { message: `The carrousel image already exists` };
        }
        carrouselByID.set(value);
        yield carrouselByID.save();
        return carrouselByID;
    }
    return { message: `We couldn't find the carrousel image for the id: ${value.id}.` };
});
exports.updateOrders = updateOrders;
const deleteOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var carrouselByID = yield db_1.Orders.findByPk(id);
    if (carrouselByID !== null) {
        if (carrouselByID.isActive) {
            carrouselByID.isActive = false;
            yield carrouselByID.save();
            return carrouselByID;
        }
        return { message: `the carrousel image with id: ${id} is already deleted` };
    }
    return { message: `We couldn't find the carrousel image for the id: ${id}` };
});
exports.deleteOrders = deleteOrders;
const getOrdersUser = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let findOrdersUser = yield db_1.Orders.findAll({
            include: [{ model: db_1.Orders_details }],
            where: { id_user: id_user },
        });
        if (findOrdersUser)
            return findOrdersUser;
        else
            return [];
    }
    catch (error) {
        return error;
    }
});
exports.getOrdersUser = getOrdersUser;

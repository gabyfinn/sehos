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
exports.updateOrder_Detail = exports.toNewOrder_Detail = exports.createOrder_detail = exports.getOrderDetail = exports.getOrders_details = void 0;
const db_1 = require("../db");
const getOrders_details = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders_details = yield db_1.Orders_details.findAll();
    if (!orders_details.length) {
        throw new Error("No existen order_Details");
    }
    return orders_details;
});
exports.getOrders_details = getOrders_details;
const getOrderDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders_details = yield db_1.Orders_details.findAll({
            include: [{ model: db_1.Orders, attributes: ["total_ammount"] }],
            where: {
                id_order: id,
            },
        });
        return orders_details;
    }
    catch (error) {
        return error;
    }
});
exports.getOrderDetail = getOrderDetail;
const createOrder_detail = (order_details) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.Orders_details.create(order_details);
    return result;
});
exports.createOrder_detail = createOrder_detail;
const toNewOrder_Detail = (object) => {
    const newOrders_details = {
        id_order: object.id_order,
        id_product: object.id_product,
        name: object.name,
        image: object.image,
        gender: object.gender,
        size: object.size,
        color: object.color,
        quantity: object.quantity,
        season: object.season,
        price: object.price,
    };
    return newOrders_details;
};
exports.toNewOrder_Detail = toNewOrder_Detail;
/* export const toUpdateOrder_Detail = (object: any): Orders_detailsI => {
 return null
} */
const updateOrder_Detail = (object) => __awaiter(void 0, void 0, void 0, function* () {
    const order_Detail = yield db_1.Orders_details.findByPk(object.id);
    if (order_Detail !== null) {
        order_Detail.set(object);
        yield order_Detail.save();
        return order_Detail;
    }
    throw new Error(`We couldn't find the order detail with the id:${object.id}.`);
});
exports.updateOrder_Detail = updateOrder_Detail;
// El order_Detail nunca se eliminar de la base de datos
/* export const deleteOrder_Detail =  async (id: number): Promise<Orders_detailsI> => {
  const order_Detail: any = await Orders_details.findByPk(id)
  if (order_Detail !== null){
    if(order_Detail.isActive){
      order_Detail.isActive = false
      await order_Detail.save();
      return order_Detail
    }
    throw new Error(`El order:${id}.`)
  }
  throw new Error(`No se encontro el order_detail con el ID:${id}.`)
} */

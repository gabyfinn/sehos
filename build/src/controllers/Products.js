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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.deleteProducts = exports.updateProducts = exports.createProducts = exports.getProductsAdmin = exports.getProducts = void 0;
// se requiere el models
const db_1 = require("../db");
const Images_1 = require("./Images");
// import { createP_Details } from './Product_details';
//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/carrousel/ = Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "image": "foTO2",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "image": "foTO3",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/carrousel/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/products = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como array de objetos.
//* {
//*   "id_category": 4,                           [number]
//*   "name": "Botas",                            [string]
//*   "description": "Botas de trabajo",          [string]
//*   "gender": "Male",                           [string] revisar en enums
//*   "season": "Winter",                         [string] revisar en enums
//*   "buy_price": 332.00,                        [integer] numero de 2 decimales
//*   "sell_price": 442.00,                       [integer] numero de 2 decimales
//*   "details": {                                [objeto]
//*       "images": [                             [array de numeros]
//*           1,
//*           2,
//*           3,
//*           4
//*       ],
//*       "id_color": 2,                           [integer] solo 1 id de color
//*       "size": [                                [array de objetos] {id de la talla, stock de dicha talla}
//*           {
//*               "id": 2,
//*               "stock": 18
//*           },
//*           {
//*               "id": 3,
//*               "stock": 15
//*           },
//*           {
//*               "id": 1,
//*               "stock": 16
//*           },
//*           {
//*               "id": 4,
//*               "stock": 10
//*           }
//*       ]
//*   }
//* }
//* DELETE http://localhost:3001/products = mandar datos es por body, solo mandar el id del producto a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID del producto)
//* }
function formatValueProduct(products) {
    products = JSON.parse(JSON.stringify(products, null, 2));
    for (var vProduct of products) {
        var details = vProduct.details[0];
        var image = details.Images.map((x) => {
            return { id: x.id, image: x.image, isActive: x.isActive };
        });
        var sizes = details.Sizes.map((x) => {
            return { id: x.id, size: x.size, stock: x.Product_details_size.stock, isActive: x.isActive };
        });
        var nDetails = {
            color: details.Color,
            images: image,
            sizes: sizes,
        };
        vProduct.details = nDetails;
    }
    return products;
}
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    // Temporal para cambiar los Fall to Autumn
    // Se trae todas las imagenes para el Slider
    var products = yield db_1.Products.findAll({
        order: [
            ['details', db_1.Sizes, 'size', 'ASC'],
            ['id', 'ASC'],
        ], include: [db_1.Users, db_1.Category, {
                model: db_1.Product_details, as: 'details', include: [db_1.Color, db_1.Images, db_1.Sizes]
            }], attributes: { exclude: ['buy_price']
        }
    });
    var productValuesFormat = formatValueProduct(products);
    return products.length > 0 ? productValuesFormat : { message: "There's no any products" };
});
exports.getProducts = getProducts;
const getProductsAdmin = (time, categoria) => __awaiter(void 0, void 0, void 0, function* () {
    // Temporal para cambiar los Fall to Autumn
    // Se trae todas las imagenes para el Slider
    const months = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
    var products = yield db_1.Products.findAll({ include: [db_1.Users, db_1.Category, db_1.Orders_details, { model: db_1.Product_details, as: 'details', include: [db_1.Color, db_1.Images, db_1.Sizes] }] });
    var productValuesFormat = formatValueProduct(products);
    let filtro;
    filtro = productValuesFormat.map((item) => {
        item.orders_details = item.orders_detail.filter((order) => {
            const t = order.time.split('-');
            let totalVentas = 0;
            totalVentas += order.total;
            const toDay = Date().split(' ');
            const difAño = (Number(toDay[3]) - Number(t[0]));
            const difMes = (months[toDay[1]] + (12 * difAño)) - Number(t[1]);
            const difDias = Number(toDay[2]) + (30 * difMes) - Number(t[2]);
            order.dif = difDias;
            item.totalVentas = totalVentas;
            return time === 'Desde el principio' ? order.order_state === 'Fulfilled' :
                (order.dif < Number(time) && (order.order_state === 'Fulfilled')); /* ? true : false */
        });
        return item;
    });
    return categoria !== '' ? filtro.filter((item) => item.Category.category === categoria) : filtro;
});
exports.getProductsAdmin = getProductsAdmin;
/* var products = await Products.findAll({
    include: [Users, Category, {
      model: Product_details, as: 'details', include: [Color, Images, Sizes],
    }]
  }) */
const createProducts = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const _a = JSON.parse(body.body), { file } = _a, value = __rest(_a, ["file"]);
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    const nProduct = yield db_1.Products.create(value); // aqui crea el producto en general.
    const details = yield nProduct.createDetail(value.details);
    //const details = await nProduct.createDetail({ id_product: nProduct.id, id_color: value.details.id_color }) // toma el producto y agrega el color.
    for (const val of value.details.size) {
        // toma el producto anteriormente creado y añade tallas con el stock de cada uno.
        yield details.addSizes(val.id, { through: { stock: val.stock } });
    }
    yield (0, Images_1.createImages)(req, details);
    return yield db_1.Products.findByPk(nProduct.id, {
        include: [db_1.Category, { model: db_1.Product_details, as: "details", include: [db_1.Color, db_1.Images, db_1.Sizes] }],
    });
});
exports.createProducts = createProducts;
const updateProducts = (value) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id
    console.log('esto es el update', value);
    var productByID = yield db_1.Products.findByPk(value.id);
    if (productByID !== null) {
        productByID.set(value);
        yield productByID.save();
        return productByID;
    }
    return { message: `we couldn't find the product with id: ${value.id}.` };
});
exports.updateProducts = updateProducts;
const deleteProducts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var productByID = yield db_1.Products.findByPk(id);
    if (productByID !== null) {
        if (productByID.isActive) {
            productByID.isActive = false;
            yield productByID.save();
            return productByID;
        }
        return { message: `The product with id ${id} is already deleted` };
    }
    return { message: `we couldn't find the product with id: ${id}` };
});
exports.deleteProducts = deleteProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.Products.findByPk(id, {
            include: [db_1.Users, db_1.Category, { model: db_1.Product_details, as: "details", include: [db_1.Color, db_1.Images, db_1.Sizes] }],
            attributes: { exclude: ["buy_price"] },
        });
        const productValuesFormat = formatValueProduct([product]);
        return productValuesFormat[0];
    }
    catch (_b) {
        return "Error no existe este producto flaco";
    }
});
exports.getProductById = getProductById;

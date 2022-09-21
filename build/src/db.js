'use strict';
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.Orders_details =
	exports.Category =
	exports.Cart_details =
	exports.Images =
	exports.Orders =
	exports.Reviews =
	exports.Products =
	exports.Product_details =
	exports.Users =
	exports.Address =
	exports.Sizes =
	exports.Carrousel =
	exports.Color =
	exports.Product_details_size =
	exports.sequelize =
		void 0;
require('dotenv').config();
const sequelize_typescript_1 = require('sequelize');
var configSequelize = {
	logging: false,
	native: false,
	timestamps: false,
	freezeTableName: true,
	models: [__dirname + '/models'],
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false, // This line will fix new error
		},
	},
};
exports.sequelize = new sequelize_typescript_1.Sequelize(String(process.env.DATABASE_URL), configSequelize);
(_a = exports.sequelize.models),
	(exports.Product_details_size = _a.Product_details_size),
	(exports.Color = _a.Color),
	(exports.Carrousel = _a.Carrousel),
	(exports.Sizes = _a.Sizes),
	(exports.Address = _a.Address),
	(exports.Users = _a.Users),
	(exports.Product_details = _a.Product_details),
	(exports.Products = _a.Products),
	(exports.Reviews = _a.Reviews),
	(exports.Orders = _a.Orders),
	(exports.Images = _a.Images),
	(exports.Cart_details = _a.Cart_details),
	(exports.Category = _a.Category),
	(exports.Orders_details = _a.Orders_details);
exports.Users.hasMany(exports.Address, { foreignKey: 'id_user' });
exports.Address.belongsTo(exports.Users, { foreignKey: 'id_user' }); //!
exports.Color.hasMany(exports.Product_details, { foreignKey: 'id_color' });
exports.Product_details.belongsTo(exports.Color, { foreignKey: 'id_color' });
exports.Products.hasMany(exports.Product_details, { as: 'details', foreignKey: 'id_product' });
exports.Product_details.belongsTo(exports.Products, { as: 'details', foreignKey: 'id_product' });
exports.Orders.hasMany(exports.Orders_details, { foreignKey: 'id_order' });
exports.Orders_details.belongsTo(exports.Orders, { foreignKey: 'id_order' });
exports.Orders.belongsTo(exports.Users, { foreignKey: 'id_user' });
exports.Users.hasMany(exports.Orders, { foreignKey: 'id_user' });
exports.Products.belongsTo(exports.Category, { foreignKey: 'id_category' });
exports.Category.hasMany(exports.Products, { foreignKey: 'id_category' });
exports.Products.hasMany(exports.Orders_details, { foreignKey: 'id_product' });
exports.Orders_details.belongsTo(exports.Products, { foreignKey: 'id_product' });
exports.Cart_details.belongsTo(exports.Sizes, { foreignKey: 'id_size' });
exports.Sizes.hasMany(exports.Cart_details, { foreignKey: 'id_size' });
exports.Products.belongsToMany(exports.Users, { foreignKey: 'id_product', through: exports.Reviews });
exports.Users.belongsToMany(exports.Products, { foreignKey: 'id_user', through: exports.Reviews });
exports.Reviews.belongsTo(exports.Products, { foreignKey: 'id_product' });
exports.Reviews.belongsTo(exports.Users, { foreignKey: 'id_user' });
exports.Users.hasMany(exports.Reviews, { foreignKey: 'id_user' });
exports.Products.hasMany(exports.Reviews, { foreignKey: 'id_product' });
exports.Product_details.belongsToMany(exports.Images, {
	foreignKey: 'id_product_details',
	through: 'product_details_image',
});
exports.Images.belongsToMany(exports.Product_details, {
	foreignKey: 'id_image',
	through: 'product_details_image',
});
exports.Product_details.belongsToMany(exports.Sizes, {
	foreignKey: 'id_product_details',
	through: exports.Product_details_size,
});
exports.Sizes.belongsToMany(exports.Product_details, {
	foreignKey: 'id_sizes',
	through: exports.Product_details_size,
});
exports.Product_details_size.belongsTo(exports.Sizes, { foreignKey: 'id_sizes' });
exports.Product_details_size.belongsTo(exports.Product_details, { foreignKey: 'id_product_details' });
exports.Sizes.hasMany(exports.Product_details_size, { foreignKey: 'id_sizes' });
exports.Product_details.hasMany(exports.Product_details_size, { foreignKey: 'id_product_details' });
exports.Users.belongsToMany(exports.Product_details, {
	as: 'favs',
	foreignKey: 'id_user',
	through: 'favourite',
});
exports.Product_details.belongsToMany(exports.Users, {
	as: 'favs',
	foreignKey: 'id_product_details',
	through: 'favourite',
});
exports.Users.belongsToMany(exports.Product_details, {
	as: 'cart',
	foreignKey: 'id_user',
	through: exports.Cart_details,
});
exports.Product_details.belongsToMany(exports.Users, {
	as: 'cart',
	foreignKey: 'id_product_details',
	through: exports.Cart_details,
});
exports.Cart_details.belongsTo(exports.Users, { foreignKey: 'id_user' });
exports.Cart_details.belongsTo(exports.Product_details, { foreignKey: 'id_product_details' });
exports.Users.hasMany(exports.Cart_details, { foreignKey: 'id_user' });
exports.Product_details.hasMany(exports.Cart_details, { foreignKey: 'id_product_details' });
/* const model: any = Users
for (let assoc of Object.keys(model.associations)) {
  for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    console.log(model.name + "." + model.associations[assoc].accessors[accessor] + "()")
  }
}
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderState = exports.Season = exports.Gender = exports.TypeUser = void 0;
var TypeUser;
(function (TypeUser) {
    TypeUser["Administrator"] = "Administrator";
    TypeUser["Employee"] = "Employee";
    TypeUser["User"] = "User";
    TypeUser["Google"] = "Google";
})(TypeUser = exports.TypeUser || (exports.TypeUser = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Unisex"] = "Unisex";
})(Gender = exports.Gender || (exports.Gender = {}));
var Season;
(function (Season) {
    Season["Winter"] = "Winter";
    Season["Summer"] = "Summer";
    Season["Autumn"] = "Autumn";
    Season["Spring"] = "Spring";
})(Season = exports.Season || (exports.Season = {}));
var OrderState;
(function (OrderState) {
    OrderState["Pending"] = "Pending";
    OrderState["Fulfilled"] = "Fulfilled";
})(OrderState = exports.OrderState || (exports.OrderState = {}));

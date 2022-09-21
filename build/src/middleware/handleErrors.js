"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, res) => {
    console.log("Error en api, revisarlo, middleware HANDLE_ERRORS: " + err.name);
    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "token invalido o faltante." });
    }
    else if (err.name === "TokenExpirerError") {
        return res.status(401).json({ error: "token expirado" });
    }
    else if (err.name === "SequelizeDatabaseError") {
        return res.status(500).json({ error: err.message });
    }
    else {
        const status = err.status || 500;
        const message = err.message || err;
        return res.status(status).json({ error: message });
    }
};
exports.errorHandler = errorHandler;

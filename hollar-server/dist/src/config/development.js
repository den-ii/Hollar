"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    PORT: process.env.PORT_DEV,
    DB: process.env.DB_DEV,
};

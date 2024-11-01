"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
const userRoute_1 = __importDefault(require("../Routes/userRoute"));
const expenseRoute_1 = __importDefault(require("../Routes/expenseRoute"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; " +
        "script-src 'self' " +
        "https://code.jquery.com/jquery-3.5.1.min.js " +
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js " +
        "https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.31/moment-timezone-with-data.js " +
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js " +
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js " +
        "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js; " +
        "style-src 'self' " +
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css; " +
        "font-src 'self' " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff2 " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.woff " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-brands-400.ttf " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.woff2 " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.woff " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-regular-400.ttf " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2 " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff " +
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf; " +
        "img-src 'self'; " +
        "frame-src 'self'");
    next();
});
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/expense', expenseRoute_1.default);
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

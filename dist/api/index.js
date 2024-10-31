"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const app = (0, express_1.default)();
const userRoute_1 = __importDefault(require("./userRoute"));
const expenseRoute_1 = __importDefault(require("./expenseRoute"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
app.use((0, cors_1.default)());
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        frameSrc: ["'self'"],
    },
    reportOnly: true, // Set to 'true' to enable report-only mode for testing
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/expense', expenseRoute_1.default);
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

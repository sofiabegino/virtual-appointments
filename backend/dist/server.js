"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
require("./utils/auth");
const error_handler_1 = require("./middlewares/error.handler");
dotenv_1.default.config();
require('./utils/auth');
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
(0, routes_1.routerApi)(app);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/', (req, res) => {
    res.send('App Works !!!!');
});
app.use(error_handler_1.logErrors);
app.use(error_handler_1.boomErrorHandler);
app.use(error_handler_1.errorHandler);
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

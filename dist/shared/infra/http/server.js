"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
app.use('/', index_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'pai ta off 😔',
    });
});
app.listen(3333, function () {
    console.log('O Pai ta on 😎📻');
});

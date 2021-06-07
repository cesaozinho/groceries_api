"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var mongoose_1 = __importDefault(require("mongoose"));
var AppError_1 = __importDefault(require("./errors/AppError"));
var lists_routes_1 = __importDefault(require("./routes/lists.routes"));
var sessions_routes_1 = __importDefault(require("./routes/sessions.routes"));
var users_routes_1 = __importDefault(require("./routes/users.routes"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/users', users_routes_1.default);
app.use('/lists', lists_routes_1.default);
app.use('/sessions', sessions_routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
mongoose_1.default.connect('mongodb://localhost:27017/groceries', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose_1.default.connection.on("error", function (err) {
    console.log("err", err);
});
mongoose_1.default.connection.on("connected", function (err, res) {
    console.log("mongoose is connected");
});
app.listen(3333, function () {
    console.log('server started at http://localhost:3333');
});

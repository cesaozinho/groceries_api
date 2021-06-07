"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    },
    itemList: [{
            _id: false,
            id: String,
            content: String,
            quantity: Number
        }]
});
exports.default = mongoose_1.default.model('List', Schema);

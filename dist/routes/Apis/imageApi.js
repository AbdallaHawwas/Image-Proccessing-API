"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileHandle = __importStar(require("../../file-handle"));
const validation = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if file is available
    if (!(yield fileHandle.isImageAvailable(params.filename))) {
        const availableImageNames = (yield fileHandle.getImagesNames()).join(', ');
        fileHandle.errArray.push(`Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`);
    }
    // Check if width & height is available
    if (!params.width && !params.height && !fileHandle.errArray.includes("You didn't Enter required Parameters")) {
        fileHandle.errArray.push(`You didn't Enter required Parameters Please Enter Width And Height`);
    }
    // Check for valid Params(width & height) value
    const width = params.width;
    const height = params.height;
    if (Number.isNaN(width) || width < 1 || Number.isNaN(height) || height < 1) {
        fileHandle.errArray.push("Please add a positive number value for the 'width & height' parameters.");
    }
    return;
});
const imageApi = express_1.default.Router();
imageApi.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let error = '';
    if (!(yield fileHandle.isImageThumbAvailable(req.query))) {
        error = yield fileHandle.resizeImgData(req.query);
        res.send(error);
        return;
    }
    // Display Errors 
    const errMessages = yield validation(req.query);
    if (fileHandle.errArray.length > 0 || errMessages) {
        res.send(`<ul>${errMessages} <br></li><li> ${fileHandle.errArray.join("<br>")}</li></ul>`);
        return;
    }
    // Return Image Path
    const imgPath = yield fileHandle.getImgPath(req.query);
    if (imgPath) {
        res.sendFile(imgPath);
    }
    else {
        res.send('Path Is in correct .. Please try again');
    }
}));
exports.default = imageApi;

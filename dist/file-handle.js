"use strict";
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
exports.errArray = exports.getImgPath = exports.getImagesNames = exports.isImageThumbAvailable = exports.createThumbPath = exports.isImageAvailable = exports.resizeImgData = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const img_process_1 = __importDefault(require("./img-process"));
const errArray = [];
exports.errArray = errArray;
// Images Path
const imgPath = path_1.default.resolve(__dirname, 'assets');
const imgThumbPath = path_1.default.resolve(__dirname, 'assets/thumbnails');
// ===== Functions =====
// Get Image Path
const getImgPath = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Check filename existing
    if (!params.filename) {
        errArray.push("You didn't Enter Filename");
    }
    // Create Path 
    const fullPath = (params.width && params.height) ?
        path_1.default.resolve(imgThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`)
        : path_1.default.resolve(imgPath, `${params.filename}.jpg`);
    // Check created path existance
    try {
        yield fs_1.promises.access(fullPath);
        return fullPath;
    }
    catch (_a) {
        return "sorry path not found";
    }
});
exports.getImgPath = getImgPath;
// Check Image Existance
const isImageAvailable = (filename = '') => __awaiter(void 0, void 0, void 0, function* () {
    // Check filename existing
    if (!filename && errArray.includes("You didn't Enter Filename")) {
        errArray.push("You didn't Enter Filename");
        return false;
    }
    return (yield getImagesNames()).includes(filename);
});
exports.isImageAvailable = isImageAvailable;
// Check Image Thumbnail Existance
const isImageThumbAvailable = (params) => __awaiter(void 0, void 0, void 0, function* () {
    if (!params.filename || !params.width || !params.height) {
        errArray.push("You didn't Enter required Parameters");
        return false;
    }
    try {
        yield fs_1.promises.access(path_1.default.resolve(imgThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`));
        return true;
    }
    catch (_b) {
        errArray.push("Thumbnails Doesn't exist");
        return false;
    }
});
exports.isImageThumbAvailable = isImageThumbAvailable;
// Get Images Names
const getImagesNames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (yield fs_1.promises.readdir(imgPath)).map((filename) => filename.split('.')[0]);
    }
    catch (_c) {
        return [];
    }
});
exports.getImagesNames = getImagesNames;
// Create Thumbnails Path 
const createThumbPath = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(imgThumbPath);
    }
    catch (_d) {
        fs_1.promises.mkdir(imgThumbPath);
    }
});
exports.createThumbPath = createThumbPath;
// send data of resizing image
const resizeImgData = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Params
    if (!params.filename || !params.width || !params.height) {
        if (!errArray.includes("You didn't Enter required Parameters")) {
            errArray.push("You didn't Enter required Parameters");
        }
    }
    const input = path_1.default.resolve(imgPath, `${params.filename}.jpg`);
    const output = path_1.default.resolve(imgThumbPath, `${params.filename}-${params.width}x${params.height}.jpg`);
    return yield (0, img_process_1.default)({
        input: input,
        output: output,
        width: params.width,
        height: params.height
    });
});
exports.resizeImgData = resizeImgData;

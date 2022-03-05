"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageApi_1 = __importDefault(require("./Apis/imageApi"));
const routes = express_1.default.Router();
routes.use('/apis/imagesApi', imageApi_1.default);
routes.get('/', (req, res) => {
    res.send(`<h1>Welcome to image-processing-api</h1>
      <p>Listening at 
        <a href="/apis/imagesApi">/apis/imagesApi</a>
       for queries containing at least a valid filename. Optionally use both width and height to set the size...</p>
      <p>Examples:
        <ul>
          <li>
            <a href="/apis/imagesApi?filename=image">/apis/imagesApi?filename=image</a>
          </li>
          <li>
            <a href="/apis/imagesApi?filename=image&width=100&height=100">/apis/imagesApi?filename=image&width=100&height=100</a>
          </li>
        </ul>
      </p>`);
});
exports.default = routes;

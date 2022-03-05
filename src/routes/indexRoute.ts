import express from 'express';
import imageApi from './Apis/imageApi';

const routes: express.Router = express.Router();

routes.use('/apis/imagesApi', imageApi);

routes.get(
  '/',
  (req: express.Request, res: express.Response): void => {
    res.send(
      `<h1>Welcome to image-processing-api</h1>
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
      </p>`
    );
  }
);

export default routes;
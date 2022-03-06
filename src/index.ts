import express from 'express';
import routes from './routes';

const app = express();
const PORT = 4000;

app.use('/api', routes);

app.use((req: express.Request, res: express.Response): void => {
    res.status(404).json({
        code: 404,
        message: 'route not found'
    })
})

app.listen(PORT, () => console.log(`Server listening at: ${PORT}`))

export default app;
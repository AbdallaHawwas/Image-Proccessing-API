import  express  from "express";
import routes from './routes/indexRoute';

const app:express.Application = express();
const port:number = 4000;

app.use(routes);
app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
});

export default app;
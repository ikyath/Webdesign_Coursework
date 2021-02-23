import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

// Setting up mongoose connection
mongoose.connect("mongodb://localhost:27017/todosDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.Promise=global.Promise;



const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

export default app;

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import mongoose from 'mongoose';
import AppError from './errors/AppError';
import listsRouter from './routes/lists.routes';
import sessionsRouter from './routes/sessions.routes';
import usersRouter from './routes/users.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/users', usersRouter);

app.use('/lists', listsRouter);

app.use('/sessions', sessionsRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
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

mongoose.connect('mongodb://localhost:27017/groceries', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on("error", err => {
    console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected");
});

app.listen(3333, () => {
    console.log('server started at http://localhost:3333');
});
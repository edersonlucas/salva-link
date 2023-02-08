import express from 'express';
import authRouter from './routes/AuthRouter';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(express.json());
app.use(authRouter);

app.use(ErrorMiddleware.error);

export default app;

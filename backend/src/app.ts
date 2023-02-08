import express from 'express';
import authRouter from './routes/AuthRouter';
import blogRouter from './routes/BlogRouter';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(express.json());
app.use(authRouter);
app.use('/blog', blogRouter);

app.use(ErrorMiddleware.error);

export default app;

import express from 'express';
import authRouter from './routes/AuthRouter';
import blogRouter from './routes/BlogRouter';
import linkRouter from './routes/LinkRouter';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

app.use(express.json());
app.use(authRouter);
app.use('/link', linkRouter);
app.use('/blog', blogRouter);

app.use(ErrorMiddleware.error);

export default app;

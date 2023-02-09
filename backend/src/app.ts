import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import authRouter from './routes/AuthRouter';
import blogRouter from './routes/BlogRouter';
import linkRouter from './routes/LinkRouter';
import ErrorMiddleware from './middlewares/ErrorMiddleware';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocs = require('../swagger.json');

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(authRouter);
app.use('/link', linkRouter);
app.use('/blog', blogRouter);

app.use(ErrorMiddleware.error);

export default app;

import express from 'express';
import routes from './routes/index.route.js';
import globalErrorHandlerMiddleware from './middlewares/global-error-handler.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(globalErrorHandlerMiddleware);

export default app;

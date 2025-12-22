import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes/index.route.js';
import globalErrorHandlerMiddleware from './middlewares/global-error-handler.middleware.js';
import compressionMiddleware from './middlewares/compression.middleware.js';
import corsOptions from './lib/cors.lib.js';
import { globalRateLimiter } from './middlewares/rate-limiting.middleware.js';

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(compressionMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalRateLimiter);

app.use(routes);

app.use(globalErrorHandlerMiddleware);

export default app;

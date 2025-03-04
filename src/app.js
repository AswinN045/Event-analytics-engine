import express, { json, urlencoded } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import routes from './routes/index.js';
import authLimiter from './middleware/rate.limiter.js'
import { errorHandler } from './middleware/error.js';
import ApiError from './utils/ApiError.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true })); 
// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
app.use('/api/auth', authLimiter);


app.use((req, res, next) => {
  if (!req.path.endsWith('/') && req.method === 'GET') {
    return res.redirect(301, req.path + '/');
  }
  next();
});

// v1 api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

export default app;

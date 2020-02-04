import './bootstrap';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import redis from 'redis';
// import RateLimit from 'express-rate-limit';
// import RateLimitRedis from 'rate-limit-redis';
import Youch from 'youch';
import io from 'socket.io';
import http from 'http';

import path from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';
import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    Sentry.init(sentryConfig);
    this.socket();
    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.conectedStudents = {};
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { student_id } = socket.handshake.query;
      this.conectedStudents[student_id] = socket.id;

      socket.on('disconect', () => {
        delete this.conectedStudents[student_id];
      });
    });
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: process.env.FRONT_URL,
      })
    );

    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    // if (process.env.NODE_ENV !== 'development') {
    //   this.app.use(
    //     new RateLimit({
    //       store: new RateLimitRedis({
    //         client: redis.createClient({
    //           host: process.env.REDIS_HOST,
    //           port: process.env.REDIS_PORT,
    //         }),
    //       }),
    //       windowMs: 1000 * 60 * 15, // 15 minutos
    //       max: 100,
    //     })
    //   );
    // }

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.conectedStudents = this.conectedStudents;
      next();
    });
  }

  routes() {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      // if (process.env.NODE_ENV === 'development') {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
      // }
      // return res.status(500).json({
      //   error: 'Internal server error',
      // });
    });
  }
}

export default new App().server;

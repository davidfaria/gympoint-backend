import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';

// Configs
import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Validators
import pkValidator from './app/validators/PKValidator';
import SessionStoreValidator from './app/validators/SessionStoreValidator';
import SessionSudentStoreValidator from './app/validators/SessionStudentStoreValidator';
import StudentCreateValidator from './app/validators/StudentCreateValidator';
import StudentUpdateValidator from './app/validators/StudentUpdateValidator';
import PlanCreateValidator from './app/validators/PlanCreateValidator';
import PlanUpdateValidator from './app/validators/PlanUpdateValidator';
import EnrollmentCreateValidator from './app/validators/EnrollmentCreateValidator';
import EnrollmentUpdateValidator from './app/validators/EnrollmentUpdateValidator';
import HelpOrderCreateValidator from './app/validators/HelpOrderCreateValidator';
import AnswerValidator from './app/validators/AnswerValidator';

// Controllers
import SessionController from './app/controllers/SessionController';
import SessionStudentController from './app/controllers/SessionStudentController';
import FileController from './app/controllers/FileController';
import StudentController from './app/controllers/StudentController';
import CheckinController from './app/controllers/CheckinController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

// Variables
const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
  res.json({
    name: 'Api Gympoint',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  });
});

// Apply Brute in production Mode
if (process.env.NODE_ENV === 'production') {
  const bruteStore = new BruteRedis({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  const bruteForce = new Brute(bruteStore);
  routes.post(
    '/sessions',
    bruteForce.prevent,
    SessionStoreValidator,
    SessionController.store
  );
} else {
  routes.post('/sessions', SessionStoreValidator, SessionController.store);
}

// Routes Students
routes.post(
  '/sessionsStudent',
  SessionSudentStoreValidator,
  SessionStudentController.store
);
routes.get('/students/:id/checkins', pkValidator, CheckinController.index);
routes.post('/students/:id/checkins', pkValidator, CheckinController.store);
routes.get('/students/:id/help-orders', pkValidator, HelpOrderController.index);
routes.post(
  '/students/:id/help-orders',
  pkValidator,
  HelpOrderCreateValidator,
  HelpOrderController.store
);

// Routes below is JWT AUTH required
routes.use(authMiddleware);

// Routes Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', pkValidator, StudentController.show);
routes.post('/students', StudentCreateValidator, StudentController.store);
routes.put(
  '/students/:id',
  pkValidator,
  StudentUpdateValidator,
  StudentController.update
);
routes.delete('/students/:id', pkValidator, StudentController.destroy);
routes.post(
  '/students/:id/files',
  pkValidator,
  upload.single('file'),
  FileController.store
);

// Routes Help Order
routes.get('/help-orders', AnswerController.index);
routes.post(
  '/help-orders/:id/answer',
  pkValidator,
  AnswerValidator,
  AnswerController.store
);

// Routes Plan
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', pkValidator, PlanController.show);
routes.post('/plans', PlanCreateValidator, PlanController.store);
routes.put(
  '/plans/:id',
  pkValidator,
  PlanUpdateValidator,
  PlanController.update
);
routes.delete('/plans/:id', pkValidator, PlanController.delete);

// Routes Enrollment
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', pkValidator, EnrollmentController.show);
routes.post(
  '/enrollments',
  EnrollmentCreateValidator,
  EnrollmentController.store
);
routes.put(
  '/enrollments/:id',
  pkValidator,
  EnrollmentUpdateValidator,
  EnrollmentController.update
);
routes.delete('/enrollments/:id', pkValidator, EnrollmentController.delete);

export default routes;

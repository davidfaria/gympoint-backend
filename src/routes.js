import { Router } from 'express';
import multer from 'multer';

// Configs
import multerConfig from './config/multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Validators
import pkValidator from './app/validators/PKValidator';
import PlanCreateValidator from './app/validators/PlanCreateValidator';
import PlanUpdateValidator from './app/validators/PlanUpdateValidator';
import EnrollmentCreateValidator from './app/validators/EnrollmentCreateValidator';
import EnrollmentUpdateValidator from './app/validators/EnrollmentUpdateValidator';
import HelpOrderCreateValidator from './app/validators/HelpOrderCreateValidator';
import AnswerValidator from './app/validators/AnswerValidator';

// Controllers
import SessionController from './app/controllers/SessionController';
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
  });
});

routes.post('/sessions', SessionController.store);

// Routes below is JWT AUTH required
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.post(
  '/students/:id/files',
  pkValidator,
  upload.single('file'),
  FileController.store
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
routes.get('/help-orders', AnswerController.index);
routes.post(
  '/help-orders/:id/answer',
  pkValidator,
  AnswerValidator,
  AnswerController.store
);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanCreateValidator, PlanController.store);
routes.put(
  '/plans/:id',
  pkValidator,
  PlanUpdateValidator,
  PlanController.update
);
routes.delete('/plans/:id', pkValidator, PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
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

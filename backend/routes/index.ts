import express from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import uploadRouter from './upload.router';
import submissionRouter from './submission.router';

export function routerApi(app:any) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/users', userRouter);
  router.use('/submissions', submissionRouter);
  router.use('/auth', authRouter);
  router.use('/upload', uploadRouter);
}

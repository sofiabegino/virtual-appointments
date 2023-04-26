"use strict";
// import express, { Express,ErrorRequestHandler, Request, Response,NextFunction } from 'express';
// import { SubmissionService } from '../services';
// import { validatorHandler } from '../middlewares';
// import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas';
// const submissionRouter = express.Router();
// const service = new SubmissionService();
// submissionRouter.get('/', async (req:Request, res:Response) => {
//   const products = await service.find();
//   res.json(products);
// });
// submissionRouter.get('/filter', (req:Request, res:Response) => {
//   res.send('Yo soy un filter');
// });
// submissionRouter.get('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req:Request, res:Response, next:NextFunction) => {
//     try {
//       const { id } = req.params;
//       const product = await service.findOne(id);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// submissionRouter.post('/',
//   validatorHandler(createUserSchema, 'body'),
//   async (req:Request, res:Response,next) => {
//     try {
//       const body = req.body;
//       const newUser = await service.create(body);
//       res.status(201).json(newUser);
//     }catch(error){
//       next(error);
//     }
//   }
// );
// submissionRouter.patch('/:id',
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
//   async (req:Request, res:Response, next:NextFunction) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const product = await service.update(id, body);
//       res.json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// submissionRouter.delete('/:id', async (req:Request, res:Response) => {
//   const { id } = req.params;
//   const rta = await service.delete(id);
//   res.json(rta);
// });
// export default userRouter;

import express, { Request, Response,NextFunction } from 'express';
import { UserService } from '../services';
import { validatorHandler } from '../middlewares';
import { createUserSchema, updateUserSchema, getUserSchema } from '../schemas';
import passport from 'passport';
import { IUpdateUser } from '../interfaces';

const userRouter = express.Router();
const service = new UserService();


userRouter.get('/',passport.authenticate('jwt',
  {session:false}),
 async (req:Request, res:Response) => {
  const user = req.user as IUpdateUser;
  const id = user.id as number;
  const products = await service.findUser(15);
  res.json(products);
});


userRouter.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req:Request, res:Response,next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    }catch(error){
      next(error);
    }
  }
);

userRouter.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
      const body = req.body;
      const {id } = req.params;
      const user = await service.update(id,body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete('/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

export default userRouter;
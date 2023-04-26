import express, {  Request, Response,NextFunction } from 'express';
import { SubmissionService } from '../services';
import { validatorHandler } from '../middlewares';
import { createSubmissionSchema, updateSubmissionSchema, getSubmissionSchema } from '../schemas';
import { UserService } from '../services/user.service';
import passport from 'passport';
import { IUpdateUser } from '../interfaces/IUser';

const submissionRouter = express.Router();
const service = new SubmissionService();
const userService = new UserService();

submissionRouter.get('/',passport.authenticate('jwt',
{session:false}),
 async (req:Request, res:Response) => {
  const user = req.user as IUpdateUser;
  const id = user.id as number;
  const submissions = await service.findPatientSubmissions(id);
  res.json(submissions);
});

submissionRouter.get('/pending', 
    async (req:Request, res:Response, next:NextFunction) => {
    try {
      const product = await service.findPending();
      res.json(product);
      } catch (error) {
      next(error);
    }
});

submissionRouter.get('/task-history', passport.authenticate('jwt',
    {session:false}),
    async (req:Request, res:Response, next:NextFunction) => {
    try {
      const user = req.user as IUpdateUser;
      const id = user.id as number;
      const product = await service.findTaskHistory(id);
      res.json(product);
      } catch (error) {
      next(error);
    }
});

submissionRouter.get('/ids',
   async (req:Request, res:Response, next:NextFunction) => {
    console.log('hola?')
    try {
        const submissions = await service.findIds();
        console.log(submissions);
        res.json(submissions);
    } catch (error) {
      next(error);
    }
  }
);
  
submissionRouter.get('/:id',
  validatorHandler(getSubmissionSchema, 'params'),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      console.log(id);
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);


submissionRouter.post('/',passport.authenticate('jwt',
  {session:false}),
  validatorHandler(createSubmissionSchema, 'body'),
  async (req:Request, res:Response,next) => {
    try {
      const body = req.body;
      const user = req.user as IUpdateUser;
      const userId = user.id as number;
      const newSubmission = await service.create(body,userId);
      res.status(201).json(newSubmission.id);
    }catch(error){
      next(error);
    }
  }
);

submissionRouter.patch('/:id',
  validatorHandler(getSubmissionSchema, 'params'),
  validatorHandler(updateSubmissionSchema, 'body'),
  passport.authenticate('jwt',{session:false}),
  async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      console.log(JSON.stringify(req.body))
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

submissionRouter.delete('/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

export default submissionRouter;
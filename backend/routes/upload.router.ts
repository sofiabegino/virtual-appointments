import express, { Request, Response,NextFunction } from 'express';
import { UploadService } from '../services/upload.service';

const uploadRouter = express.Router();
const service = new UploadService();

uploadRouter.post('/', 
    async (req:Request, res:Response, next:NextFunction) => {
      try {
        const imageUrl = await service.uploadFile(req,res);
        res.json(imageUrl);
      } catch (error) {
        next(error);
      }
});

export default uploadRouter;
import boom from '@hapi/boom';
import express, { Express,ErrorRequestHandler, Request, Response,NextFunction } from 'express';
import { ObjectType } from 'typescript';

export function validatorHandler(schema:any,property: string) {
  return async (req:Request, res:Response, next:NextFunction) => {
    const data = req[property as keyof Request];
    await schema.validate(data).catch(function (err:any) {
      next(boom.badRequest(err));
    });
    next();
  }
}
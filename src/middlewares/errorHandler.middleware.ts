import { NextFunction, Request, Response } from 'express';
import HttpError from '@configs/httpError';

function errorHandlerMiddleware(err: HttpError | Error, req: Request, res: Response, next: NextFunction) {
  let codigoErro: number;
  if (err instanceof HttpError) {
    codigoErro = err.code;
  } else {
    codigoErro = 500;
  }
  console.log(err.message);
  res.status(codigoErro).send({
    mensagemErro: err.message,
  });
}

export default errorHandlerMiddleware;

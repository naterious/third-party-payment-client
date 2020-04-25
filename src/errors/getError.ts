import * as r from 'ramda';

import {
  UnauthorizedRequestError,
  TokenExpiredError,
  RequestValidationError,
  PaymentStatusError,
  ServerError,
  RequestTimeoutError,
} from './errorsClass';

export type GetError = (errorObject: {
  code: number,
  message: string,
}) => Error;

const getError: GetError = (errorObject) => {
  const errorMessage = `${errorObject.code} - ${errorObject.message}`;

  return r.cond([
    [
      r.equals(400),
      () => new RequestValidationError(`${errorMessage}`),
    ],
    [
      r.equals(401),
      () => new UnauthorizedRequestError(`${errorMessage}`),
    ],
    [
      r.equals(403),
      () => new TokenExpiredError(`${errorMessage}`),
    ],
    [
      r.equals(408),
      () => new RequestTimeoutError(`${errorMessage}`),
    ],
    [
      r.equals(409),
      () => new PaymentStatusError(`${errorMessage}`),
    ],
    [
      r.T,
      () => new ServerError(`${errorMessage}`),
    ],
  ])(errorObject.code);
};

export default getError;
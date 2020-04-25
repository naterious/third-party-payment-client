import * as r from 'ramda';

import getError from '../src/errors/getError';

export const createApiRequestMock = (
  value: object,
  error?: {
    code: number,
    message: string,
  }
) => {
  const apiRequestMock = () => r.ifElse(
    r.isNil,
    () => Promise.resolve(value),
    () => Promise.reject(getError(error))
  )(error);


  return apiRequestMock;
};

// eslint-disable-next-line no-unused-vars
export const setAuthTokenMock = (token: string) => ({});
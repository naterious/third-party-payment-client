import { expect } from 'chai';
import * as r from 'ramda';

import { createApiRequestMock, setAuthTokenMock } from './mocks';
import {
  RequestValidationError,
  RequestTimeoutError,
  ServerError,
} from '../src/errors/errorsClass';

import authenticate from '../src/methods/authenticate';

describe('authenticate', () => {

  context('when the request is successful', () => {
    const apiRequestMock = createApiRequestMock({
      authToken: 'testToken',
      expiresIn: 'sometime',
    });
    it('should return and object of token details', () => {
      return authenticate(
        apiRequestMock,
        setAuthTokenMock,
      )({
        username: 'test',
        password: 'test',
      })
        .then((result) => {
          expect(result).to.have.keys(
            'authToken',
            'expiresIn'
          );
        });
    });
  });

  context('when no userDetails are provided', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 400,
        message: 'details are required',
      }
    );
    it('should return an error of RequestValidationError', () => {
      // @ts-ignore
      return authenticate(
        apiRequestMock,
        setAuthTokenMock,
      )()
        .catch((error: RequestValidationError) => {
          expect(r.is(RequestValidationError, error)).to.equal(true);
        });
    });
  });

  context('when the request times out', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 408,
        message: 'request timed out',
      }
    );
    it('should return an error of RequestTimeoutError', () => {
      return authenticate(
        apiRequestMock,
        setAuthTokenMock,
      )({
        username: 'test',
        password: 'test',
      })
        .catch((error: RequestTimeoutError) => {
          expect(r.is(RequestTimeoutError, error)).to.equal(true);
        });
    });
  });

  context('when an unknown error occurs', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 500,
        message: 'unkown error',
      }
    );
    it('should return an error of ServerError', () => {
      return authenticate(
        apiRequestMock,
        setAuthTokenMock,
      )({
        username: 'test',
        password: 'test',
      })
        .catch((error: ServerError) => {
          expect(r.is(ServerError, error)).to.equal(true);
        });
    });
  });

});
import { expect } from 'chai';
import * as r from 'ramda';

import { createApiRequestMock } from './mocks';
import {
  RequestValidationError,
  UnauthorizedRequestError,
  TokenExpiredError,
  RequestTimeoutError,
  ServerError,
} from '../src/errors/errorsClass';

import createPayment from '../src/methods/createPayment';

describe('createPayment', () => {

  context('when the request is successful', () => {
    const apiRequestMock = createApiRequestMock({
      id: 'id',
      payeeId: 'id',
      payerId: 'id',
      paymentSystem: 'system',
      paymentMethod: 'method',
      amount: 100,
      currency: 'USD',
      status: 'string',
      comment: 'no comment',
      created: new Date(),
      updated: new Date(),
    });
    it('should return the created payment details', () => {
      return createPayment(apiRequestMock)({
        payeeId: 'id',
        payerId: 'id',
        paymentSystem: 'system',
        paymentMethod: 'method',
        amount: 100,
        currency: 'USD',
        comment: 'no comment',
      })
        .then((result) => {
          expect(result).to.have.keys(
            'id',
            'payeeId',
            'payerId',
            'paymentSystem',
            'paymentMethod',
            'amount',
            'currency',
            'status',
            'comment',
            'created',
            'updated'
          );
        });
    });
  });

  context('when no payment information is provided', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 400,
        message: 'id is required',
      }
    );
    it('should return an error of RequestValidationError', () => {
      // @ts-ignore
      return createPayment(apiRequestMock)()
        .catch((error: RequestValidationError) => {
          expect(r.is(RequestValidationError, error)).to.equal(true);
        });
    });
  });

  context('when the request in not authenticated', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 401,
        message: 'not authenticated',
      }
    );
    it('should return an error of UnauthorizedRequestError', () => {
      return createPayment(apiRequestMock)({
        payeeId: 'id',
        payerId: 'id',
        paymentSystem: 'system',
        paymentMethod: 'method',
        amount: 100,
        currency: 'USD',
        comment: 'no comment',
      })
        .catch((error: UnauthorizedRequestError) => {
          expect(r.is(UnauthorizedRequestError, error)).to.equal(true);
        });
    });
  });

  context('when the user token has expired', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 403,
        message: 'token expired',
      }
    );
    it('should return an error of TokenExpiredError', () => {
      return createPayment(apiRequestMock)({
        payeeId: 'id',
        payerId: 'id',
        paymentSystem: 'system',
        paymentMethod: 'method',
        amount: 100,
        currency: 'USD',
        comment: 'no comment',
      })
        .catch((error: TokenExpiredError) => {
          expect(r.is(TokenExpiredError, error)).to.equal(true);
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
      return createPayment(apiRequestMock)({
        payeeId: 'id',
        payerId: 'id',
        paymentSystem: 'system',
        paymentMethod: 'method',
        amount: 100,
        currency: 'USD',
        comment: 'no comment',
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
      return createPayment(apiRequestMock)({
        payeeId: 'id',
        payerId: 'id',
        paymentSystem: 'system',
        paymentMethod: 'method',
        amount: 100,
        currency: 'USD',
        comment: 'no comment',
      })
        .catch((error: ServerError) => {
          expect(r.is(ServerError, error)).to.equal(true);
        });
    });
  });

});
import { expect } from 'chai';
import * as r from 'ramda';

import { createApiRequestMock } from './mocks';
import {
  RequestValidationError,
  UnauthorizedRequestError,
  TokenExpiredError,
  RequestTimeoutError,
  PaymentStatusError,
  ServerError,
} from '../src/errors/errorsClass';

import approvePayment from '../src/methods/approvePayment';

describe('approvePayment', () => {

  context('when the request is successful', () => {
    const apiRequestMock = createApiRequestMock({});
    it('should return OK', () => {
      return approvePayment(apiRequestMock)('paymentId')
        .then((result) => {
          expect(result).to.equal('OK');
        });
    });
  });

  context('when no payment id is provided', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 400,
        message: 'id is required',
      }
    );
    it('should return an error of RequestValidationError', () => {
      // @ts-ignore
      return approvePayment(apiRequestMock)()
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
      return approvePayment(apiRequestMock)('paymentId')
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
      return approvePayment(apiRequestMock)('paymentId')
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
      return approvePayment(apiRequestMock)('paymentId')
        .catch((error: RequestTimeoutError) => {
          expect(r.is(RequestTimeoutError, error)).to.equal(true);
        });
    });
  });

  context('when the payment cannnot be updated', () => {
    const apiRequestMock = createApiRequestMock(
      {},
      {
        code: 409,
        message: 'payment cannnot be updated',
      }
    );
    it('should return an error of PaymentStatusError', () => {
      return approvePayment(apiRequestMock)('paymentId')
        .catch((error: PaymentStatusError) => {
          expect(r.is(PaymentStatusError, error)).to.equal(true);
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
      return approvePayment(apiRequestMock)('paymentId')
        .catch((error: ServerError) => {
          expect(r.is(ServerError, error)).to.equal(true);
        });
    });
  });

});
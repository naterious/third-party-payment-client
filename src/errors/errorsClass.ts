import ExtendableError from 'es6-error';

export class DataError extends ExtendableError {
  data: object;
  // eslint-disable-next-line fp/no-nil
  constructor(message: string, data?: object) {
    super(message);
    if (data) {
      // eslint-disable-next-line fp/no-this, fp/no-mutation
      this.data = data;
    }
  }
}

export class UnauthorizedRequestError extends DataError {}

export class TokenExpiredError extends DataError {}

export class RequestValidationError extends DataError {}

export class PaymentStatusError extends DataError {}

export class RequestTimeoutError extends DataError {}

export class ServerError extends DataError {}
# third-party-payment-client

## Install
Using `yalc` in place of `npm/yarn link` as it works more reliably and doesn't cause TS issues. Install globally using `npm install -g yalc`
1. run `npm install -g yalc`
2. run `yarn setup` (runs install, build, yalc publish)
3. in consuming project run `yalc add third-party-payment-client`

## Usage
```
import createThirdPartyClient from 'third-party-payment-client';

const thirdPartyPaymentClient = createThirdPartyClient(url);

thirdPartyPaymentClient.listPayments()
  .then((payments) => console.log(payments))
  .catch((error) => console.log(error))
```

## Tests
1. run `yarn build`
2. run `yarn test`

## Functions
### authenticate
```
authenticate: ({
    username: string,
    password: string,
  }) => Promise<{
    authToken: string,
    expiresIn: string,
  } | Error>;
```

### listPayments
```
listPayments: () => ({
    id: string,
    payeeId: string,
    payerId: string,
    paymentSystem: string,
    paymentMethod: string,
    amount: number,
    currency: string,
    status: string,
    comment: null | string,
    created: Date,
    updated: Date,
  }[] | Error);

```

### createPayment
```
  createPayment: (paymentDetails: {
    payeeId: string,
    payerId: string,
    paymentSystem: string,
    paymentMethod: string,
    amount: number,
    currency: string,
    comment: null | string,
  }) => Promise<{
    id: string,
    payeeId: string,
    payerId: string,
    paymentSystem: string,
    paymentMethod: string,
    amount: number,
    currency: string,
    status: string,
    comment: null | string,
    created: Date,
    updated: Date,
  } | Error>;
```

### getPayment
```
  getPayment: (id: string) => Promise<{
    id: string,
    payeeId: string,
    payerId: string,
    paymentSystem: string,
    paymentMethod: string,
    amount: number,
    currency: string,
    status: string,
    comment: null | string,
    created: Date,
    updated: Date,
  } | Error>;
```

### approvePayment
```
approvePayment: (id: string) => Promise<string | Error>;
```

### cancelPayment
```
cancelPayment: (id: string) => Promise<string | Error>;
```

## Errors
If the function fails, an error will be returned, please see below errors

| Code | Error                     | Example                                                                             |
|------|---------------------------|-------------------------------------------------------------------------------------|
| 400  | RequestValidationError    | RequestValidationError: 400 - Validation failed                                     |
| 401  | UnauthorizedRequestError  | UnauthorizedRequestError: 401 - No auth token provided                              |
| 403  | TokenExpiredError         | TokenExpiredError: 403 - Auth token expired                                         |
| 408  | RequestTimeoutError       | RequestTimeoutError: 408 - The request was made but no reponse was received         |
| 409  | PaymentStatusError        | PaymentStatusError: 409 -  Cannot approve a payment that has already been cancelled |
| 500  | Server Error              | Servererror: 500 - Internal server error                                            |

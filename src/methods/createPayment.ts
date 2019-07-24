import { ApiRequest } from '../repositories/apiRequest';

import { CreatePaymentResponse } from './responseTypes';

export type CreatePayment = (paymentDetails: {
  payeeId: string,
  payerId: string,
  paymentSystem: string,
  paymentMethod: string,
  amount: number,
  currency: string,
  comment: null | string,
}) => Promise<CreatePaymentResponse | Error>;

export default (apiRequest: ApiRequest): CreatePayment => (paymentDetails) => {
  return apiRequest({
    method: 'POST',
    path: '/v1/payments',
    body: paymentDetails,
  })
    .then((result: CreatePaymentResponse) => result);
};
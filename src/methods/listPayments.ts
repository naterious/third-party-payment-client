import { ApiRequest } from '../repositories/apiRequest';

import { ListPaymentResponse } from './responseTypes';

export type ListPayments = () => Promise<ListPaymentResponse | Error>;

export default (apiRequest: ApiRequest): ListPayments => () => {
  return apiRequest({
    method: 'GET',
    path: '/v1/payments',
  })
    .then((result: ListPaymentResponse) => result);
};
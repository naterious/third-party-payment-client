import { ApiRequest } from '../repositories/apiRequest';

import { GetPaymentResponse } from './responseTypes';

export type GetPayment = (id: string) => Promise<GetPaymentResponse | Error>;

export default (apiRequest: ApiRequest): GetPayment => (id) => {
  return apiRequest({
    method: 'GET',
    path: `/v1/payments/${id}`,
  })
    .then((result: GetPaymentResponse) => result);
};
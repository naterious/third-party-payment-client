import { ApiRequest } from '../repositories/apiRequest';

export type CancelPayment = (id: string) => Promise<string | Error>;

export default (apiRequest: ApiRequest): CancelPayment => (id) => {
  return apiRequest({
    method: 'PUT',
    path: `/v1/payments/${id}/cancel`,
  }).then(() => 'OK');
};
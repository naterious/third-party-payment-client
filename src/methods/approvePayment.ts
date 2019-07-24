import { ApiRequest } from '../repositories/apiRequest';

export type ApprovePayment = (id: string) => Promise<string | Error>;

export default (apiRequest: ApiRequest): ApprovePayment => (id) => {
  return apiRequest({
    method: 'PUT',
    path: `/v1/payments/${id}/approve`,
  }).then(() => 'OK');
};
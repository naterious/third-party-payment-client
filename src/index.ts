import composeApiRequest from './repositories/apiRequest';
import setAuthToken from './repositories/setAuthToken';

import getError from './errors/getError';

import composeAuthenticate from './methods/authenticate';
import composeListPayments from './methods/listPayments';
import composeCreatePayment from './methods/createPayment';
import composeGetPayment from './methods/getPayment';
import composeApprovePayment from './methods/approvePayment';
import composeCancelPayment from './methods/cancelPayment';

export default (apiUrl: string) => {
  const apiRequest = composeApiRequest(getError, apiUrl);

  const authenticate = composeAuthenticate(apiRequest, setAuthToken);

  const listPayments = composeListPayments(apiRequest);

  const createPayment = composeCreatePayment(apiRequest);

  const getPayment = composeGetPayment(apiRequest);

  const approvePayment = composeApprovePayment(apiRequest);

  const cancelPayment = composeCancelPayment(apiRequest);

  return {
    authenticate,
    listPayments,
    createPayment,
    getPayment,
    approvePayment,
    cancelPayment,
  };
};
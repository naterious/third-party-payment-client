import { ApiRequest } from '../repositories/apiRequest';
import { SetAuthToken } from '../repositories/setAuthToken';

import { AuthenticateResponse } from './responseTypes';

export type Authenticate = (userDetails: {
  username: string,
  password: string,
}) => Promise<AuthenticateResponse | Error>;

export default (
  apiRequest: ApiRequest,
  setAuthToken: SetAuthToken,
): Authenticate => (userDetails) => {
  return apiRequest({
    method: 'POST',
    path: '/v1/authenticate',
    body: userDetails,
  })
    .then((result: AuthenticateResponse) => {
      setAuthToken(result.authToken);
      return result;
    });
};
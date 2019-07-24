import axios from 'axios';

export type SetAuthToken = (token: string) => void;

// eslint-disable-next-line fp/no-nil
const setAuthToken: SetAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request
    // eslint-disable-next-line fp/no-mutation
    axios.defaults.headers.common.Authorization = token;
  } else {
    // Delete auth header
    // eslint-disable-next-line fp/no-delete
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
import axios, { AxiosResponse, AxiosError } from 'axios';
import url from 'url';
import * as r from 'ramda';

import { GetError } from '../errors/getError';

import { ApiResponse } from '../methods/responseTypes';

export type ApiRequest = (details: {
  method: 'GET' | 'POST' | 'PUT',
  path: string,
  body?: object,
}) => Promise<ApiResponse | Error>;

export default (
  getError: GetError,
  baseUrl: string,
): ApiRequest => (details) => {
  const options = {
    method: details.method,
    // url.resolve is used to cover differences in
    // provided baseUrl, could be example.com/api or
    // example.com/api/ url.resolve will handle either
    url: url.resolve(baseUrl, details.path),
    data: details.body,
  };

  return axios(options)
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError) => {
      if (!r.isNil(error.response)) {
        return Promise.reject(getError(error.response.data));
      }
      if (!r.isNil(error.request)) {
        return Promise.reject(
          getError({
            code: 408,
            message: 'The request was made but no reponse was received',
          })
        );
      }
      return Promise.reject(error);
    });
};
import { expect } from 'chai';

import createThirdPartyPaymentClient from '../dist/index';

describe('module initilization', () => {

  context('when a url is provided', () => {
    it('should return an object of the functions', () => {
      const result = createThirdPartyPaymentClient('exmaple.com/');
      expect(result).to.have.keys(
        'authenticate',
        'approvePayment',
        'cancelPayment',
        'createPayment',
        'getPayment',
        'listPayments'
      );
    });
  });

});
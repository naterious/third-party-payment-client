export type AuthenticateResponse = {
  authToken: string,
  expiresIn: string,
};

export type CreatePaymentResponse = {
  id: string,
  payeeId: string,
  payerId: string,
  paymentSystem: string,
  paymentMethod: string,
  amount: number,
  currency: string,
  status: string,
  comment: null | string,
  created: Date,
  updated: Date,
};

export type GetPaymentResponse = {
  id: string,
  payeeId: string,
  payerId: string,
  paymentSystem: string,
  paymentMethod: string,
  amount: number,
  currency: string,
  status: string,
  comment: null | string,
  created: Date,
  updated: Date,
};

export type ListPaymentResponse = {
  id: string,
  payeeId: string,
  payerId: string,
  paymentSystem: string,
  paymentMethod: string,
  amount: number,
  currency: string,
  status: string,
  comment: null | string,
  created: Date,
  updated: Date,
}[];

export type ApiResponse = AuthenticateResponse |
  CreatePaymentResponse |
  GetPaymentResponse |
  ListPaymentResponse;
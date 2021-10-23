export enum ProviderRpcErrorStatusCodes {
  // https://eips.ethereum.org/EIPS/eip-1193#provider-errors
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  Unsupported = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
  // https://eips.ethereum.org/EIPS/eip-1474#error-codes
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603,
  InvalidInput = -32000,
  ResourceNotFound = -32001,
  ResourceUnavailable = -32002,
  TransactionRejected = -32003,
  MethodNotSupported = -32004,
  LimitExceeded = -32005,
  JsonRPCVersionNotSupported = -32006,
}

export class ProviderRpcErrorUtils {
  constructor() {

  }
}

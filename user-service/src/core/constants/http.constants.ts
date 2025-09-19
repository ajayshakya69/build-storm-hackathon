export const HTTP_RESPONSE_CODES = {
  FAILED_DEPENDENCY: {
    CODE: 424,
    MESSAGE: 'Failed Dependency',
  },
  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: 'Something went wrong',
  },
};

export const NO_HEADER_ERROR_MESSAGE = 'No authorization header provided';
export const INVALID_TOKEN_ERROR_MESSAGE = 'Invalid authorization format';
export const EXPIRED_TOKEN_ERROR_MESSAGE = 'Invalid or expired token';

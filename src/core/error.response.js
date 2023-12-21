const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode')

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
    super(message, statusCode)
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonPhrases.FORBIDEN, statusCode = StatusCodes.FORBIDEN) {
    super(message, statusCode)
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode)
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError
}

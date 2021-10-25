class HttpRequestException extends Error {
  statusCode: number
  type: string
  message: string
  moreInfo: string | any
  success: string

  constructor(statusCode: number, type: string, message: string, moreInfo: string | any, success: string) {
    super(message)
    this.statusCode = statusCode
    this.type = type
    this.message = message
    this.moreInfo = moreInfo
    this.success = success
  }
}

class ResourceNotFoundException extends HttpRequestException {
  constructor(error: any = {}) {
    super(
      error.statusCode || 400,
      error.type || 'ResourceNotFoundException',
      error.message || 'The resource could not be found.',
      error.moreInfo || undefined,
      error.success || 'false'
    )
  }
}

class ValidationError extends HttpRequestException {
  constructor(error: any = {}) {
    super(
      error.statusCode || 400,
      error.type || 'ValidationError',
      error.message || 'The Object passed is not valid.',
      error.moreInfo || undefined,
      error.success || 'false'
    )
  }
}

class ConflictResponse extends HttpRequestException {
  constructor(error: any = {}) {
    super(
      error.statusCode || 409,
      error.type || 'ConflictResponse',
      error.message || 'The operation might cause a conflict',
      error.moreInfo || undefined,
      error.success || 'false'
    )
  }
}

class HttpUnkownException extends HttpRequestException {
  constructor(error: any = {}) {
    super(
      error.statusCode || undefined,
      error.type || undefined,
      error.message || undefined,
      error.moreInfo || undefined,
      error.success || undefined
    )
  }
}

class NotFound extends HttpRequestException {
  constructor(error: any = {}) {
    super(
      error.statusCode || 404,
      error.type || 'NotFound',
      error.message || 'The server has not found anything matching the Request',
      error.moreInfo || undefined,
      error.success || 'false'
    )
  }
}

export { HttpRequestException, ResourceNotFoundException, ValidationError, NotFound, HttpUnkownException }

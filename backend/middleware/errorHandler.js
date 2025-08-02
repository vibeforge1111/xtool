export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Not Found';
  } else if (err.message) {
    message = err.message;
  }

  // Don't expose sensitive error details in production
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      error: {
        message,
        statusCode
      }
    });
  } else {
    res.status(statusCode).json({
      error: {
        message,
        statusCode,
        stack: err.stack
      }
    });
  }
};
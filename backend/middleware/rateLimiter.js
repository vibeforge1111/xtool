// Simple in-memory rate limiter
const requests = new Map();

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // Max requests per window

  if (!requests.has(ip)) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const userRequests = requests.get(ip);

  // Reset if window has passed
  if (now > userRequests.resetTime) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  // Check if limit exceeded
  if (userRequests.count >= maxRequests) {
    return res.status(429).json({
      error: {
        message: 'Too many requests. Please try again later.',
        statusCode: 429,
        retryAfter: Math.ceil((userRequests.resetTime - now) / 1000)
      }
    });
  }

  // Increment counter
  userRequests.count++;
  next();
};
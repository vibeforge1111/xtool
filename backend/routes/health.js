import express from 'express';

const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'X Insights API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Detailed health check
router.get('/detailed', (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      api: {
        status: 'UP',
        responseTime: Date.now()
      },
      twitter: {
        status: process.env.TWITTER_API_KEY ? 'CONFIGURED' : 'NOT_CONFIGURED'
      },
      redis: {
        status: 'NOT_IMPLEMENTED'
      }
    },
    system: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version
    }
  };

  res.json(healthData);
});

export default router;
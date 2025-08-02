import express from 'express';
import { TwitterApi } from 'twitter-api-v2';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Twitter OAuth initiation
router.post('/twitter/initiate', async (req, res) => {
  try {
    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
      process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/auth/twitter/callback',
      {
        scope: ['tweet.read', 'users.read', 'offline.access'],
      }
    );

    // Store codeVerifier and state temporarily (in production, use Redis)
    // For now, we'll return them to the client to handle
    res.json({
      authUrl: url,
      codeVerifier,
      state
    });
  } catch (error) {
    console.error('Twitter OAuth initiation error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to initiate Twitter OAuth',
        details: error.message
      }
    });
  }
});

// Twitter OAuth callback
router.post('/twitter/callback', async (req, res) => {
  try {
    const { code, state, codeVerifier } = req.body;

    if (!code || !codeVerifier) {
      return res.status(400).json({
        error: {
          message: 'Missing required parameters: code and codeVerifier'
        }
      });
    }

    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    // Exchange code for access token
    const { 
      client: loggedClient,
      accessToken,
      refreshToken,
      expiresIn
    } = await client.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/api/auth/twitter/callback',
    });

    // Get user information
    const { data: user } = await loggedClient.v2.me({
      'user.fields': ['id', 'name', 'username', 'profile_image_url', 'public_metrics']
    });

    // Create JWT token for our app
    const jwtToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        name: user.name
      },
      process.env.JWT_SECRET || 'your-jwt-secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        profileImage: user.profile_image_url,
        publicMetrics: user.public_metrics
      },
      tokens: {
        accessToken: jwtToken,
        twitterAccessToken: accessToken,
        twitterRefreshToken: refreshToken,
        expiresIn
      }
    });
  } catch (error) {
    console.error('Twitter OAuth callback error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to complete Twitter OAuth',
        details: error.message
      }
    });
  }
});

// Verify JWT token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: { message: 'No token provided' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
    
    res.json({
      valid: true,
      user: {
        userId: decoded.userId,
        username: decoded.username,
        name: decoded.name
      }
    });
  } catch (error) {
    res.status(401).json({
      error: { message: 'Invalid token' }
    });
  }
});

export default router;
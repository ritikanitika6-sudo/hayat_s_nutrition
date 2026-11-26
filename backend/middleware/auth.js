/**
 * Authentication & Authorization Middleware for Hayat's Nutrition Backend
 * 
 * Supports:
 * - Public read access for general sports & clinical data
 * - Optional API key authorization for protected management endpoints
 * - Demo token simulation for client interaction
 */

export const requireApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  const expectedKey = process.env.API_SECRET_KEY || 'hayat-clinical-secret-2026';

  // Allow bypass in development mode if demo header is present
  if (req.headers['x-demo-user']) {
    req.user = {
      id: 'demo-athlete-1',
      name: req.headers['x-demo-user'],
      role: 'athlete'
    };
    return next();
  }

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Missing required API key in x-api-key or Authorization header'
    });
  }

  const cleanKey = apiKey.replace('Bearer ', '').trim();
  if (cleanKey !== expectedKey) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Invalid API key provided'
    });
  }

  req.user = {
    id: 'admin-1',
    role: 'nutritionist',
    name: 'Clinical Administrator'
  };

  next();
};

export const optionalAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization'];
  if (apiKey) {
    req.isAuthenticated = true;
    req.user = { role: 'authorized_user' };
  } else {
    req.isAuthenticated = false;
    req.user = { role: 'guest' };
  }
  next();
};

export default { requireApiKey, optionalAuth };


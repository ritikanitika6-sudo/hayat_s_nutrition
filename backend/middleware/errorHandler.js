/**
 * Centralized Error Handling Middleware
 */

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `The requested endpoint ${req.method} ${req.originalUrl} was not found on this server.`,
    availableEndpoints: [
      '/api/health',
      '/api/sports',
      '/api/meal-plans',
      '/api/recipes',
      '/api/goals',
      '/api/food-guides',
      '/api/calculators/bmi',
      '/api/calculators/bmr',
      '/api/calculators/tdee',
      '/api/calculators/protein',
      '/api/calculators/hydration',
      '/api/calculators/all',
      '/api/hydration',
      '/api/plans/generate',
      '/api/consultations'
    ]
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error('[Backend Error]:', err.stack || err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: err.name || 'ServerError',
    message,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
};

export default { notFoundHandler, globalErrorHandler };


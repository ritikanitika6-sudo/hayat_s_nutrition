import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { storage } from './data/storage.js';

// Route handlers
import sportsRoutes from './routes/sports.js';
import mealPlansRoutes from './routes/mealPlans.js';
import recipesRoutes from './routes/recipes.js';
import goalsRoutes from './routes/goals.js';
import foodGuidesRoutes from './routes/foodGuides.js';
import calculatorsRoutes from './routes/calculators.js';
import hydrationRoutes from './routes/hydration.js';
import plansRoutes from './routes/plans.js';
import consultationsRoutes from './routes/consultations.js';

// Middleware
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration supporting frontend dev servers
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('CORS origin blocked by Hayat Clinical Server policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-demo-user']
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ----------------- ROOT & HEALTH CHECKS -----------------

app.get('/', (req, res) => {
  res.json({
    service: "Hayat's Nutrition Digital Platform API",
    version: '1.0.0',
    status: 'online',
    standards: 'Modern Clinical Performance',
    documentation: '/api/health',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    nodeVersion: process.version,
    endpoints: {
      sports: '/api/sports',
      mealPlans: '/api/meal-plans',
      recipes: '/api/recipes',
      goals: '/api/goals',
      foodGuides: '/api/food-guides',
      calculators: {
        bmi: 'POST /api/calculators/bmi',
        bmr: 'POST /api/calculators/bmr',
        tdee: 'POST /api/calculators/tdee',
        protein: 'POST /api/calculators/protein',
        hydration: 'POST /api/calculators/hydration',
        all: 'POST /api/calculators/all'
      },
      hydration: {
        status: 'GET /api/hydration',
        add: 'POST /api/hydration/add',
        reset: 'POST /api/hydration/reset',
        history: 'GET /api/hydration/history'
      },
      plans: {
        generate: 'POST /api/plans/generate',
        saved: 'GET /api/plans/saved'
      },
      consultations: {
        book: 'POST /api/consultations',
        list: 'GET /api/consultations'
      }
    }
  });
});

// Platform aggregated statistics
app.get('/api/stats', (req, res) => {
  try {
    const sports = storage.getCollection('sports');
    const mealPlans = storage.getCollection('mealPlans');
    const recipes = storage.getCollection('recipes');
    const goals = storage.getCollection('goals');
    const savedPlans = storage.getCollection('generatedPlans');
    const consultations = storage.getCollection('consultations');
    const hydration = storage.getHydration();

    res.json({
      success: true,
      stats: {
        totalSportsSupported: sports.length,
        totalMealPlans: mealPlans.length,
        totalRecipes: recipes.length,
        totalPerformanceGoals: goals.length,
        totalPlansGenerated: savedPlans.length,
        totalConsultationsRequested: consultations.length,
        todayHydrationLoggedMl: hydration.currentWater || 0,
        todayHydrationPercentage: Math.min(Math.round(((hydration.currentWater || 0) / (hydration.maxWater || 2500)) * 100), 100)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------- API ROUTES -----------------

app.use('/api/sports', sportsRoutes);
app.use('/api/meal-plans', mealPlansRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/food-guides', foodGuidesRoutes);
app.use('/api/calculators', calculatorsRoutes);
app.use('/api/hydration', hydrationRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/consultations', consultationsRoutes);

// ----------------- ERROR HANDLING -----------------

app.use(notFoundHandler);
app.use(globalErrorHandler);

// ----------------- SERVER INITIALIZATION -----------------

import { fileURLToPath } from 'url';

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url) || process.argv[1]?.endsWith('server.js');

let server;
if (isMainModule) {
  server = app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🌿 Hayat's Nutrition Clinical Backend is Running!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`🩺 Health API: http://localhost:${PORT}/api/health`);
    console.log(`📊 Stats API:  http://localhost:${PORT}/api/stats`);
    console.log(`⚡ Mode:       ${NODE_ENV}`);
    console.log(`======================================================\n`);
  });
}

export { app, server };
export default app;

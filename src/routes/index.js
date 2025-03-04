import { Router } from 'express';
import authRoute from './auth.route.js';
import docsRoute from './docs.route.js';
import AnalyticRoute from './analytic.route.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/analytics',
    route: AnalyticRoute,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


export default router;

import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import swaggerDefinition from '../docs/swaggerDef.js';

const router = Router();

const specs = swaggerJsdoc({
  definition: swaggerDefinition, 
  apis: ['routes/*.js', 'docs/*.yml'], 
});


router.use('/', serve, setup(specs));

export default router;

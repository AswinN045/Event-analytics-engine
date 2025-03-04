import { port } from '../config/config.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Event-Analytics API documentation',
    version:"1.10"
  },
  servers: [
    {
      url: `http://localhost:${port}/api`,
    },
  ],
};

export default swaggerDefinition;

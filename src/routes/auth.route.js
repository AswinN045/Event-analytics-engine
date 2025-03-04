import { Router } from 'express';
import validate from '../middleware/validate.js';
import { register, getApiKey, revokeApiKey } from '../validations/auth.validations.js'
import { register as _register, getApiKeyController , revokeApiKeyController } from '../controllers/auth.controller.js'

const router = Router();

router.post('/register', validate(register), _register);
router.get('/api-key/:id', validate(getApiKey), getApiKeyController);
router.post('/revoke', validate(revokeApiKey), revokeApiKeyController);


export default router;
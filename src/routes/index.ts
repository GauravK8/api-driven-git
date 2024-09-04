import { Router } from 'express';
import { healthRouter } from './health.routes';
import { gitRouter } from './git.routes';

const router: Router = Router();

router.use('/health', healthRouter);
router.use('/git', gitRouter);

export { router };

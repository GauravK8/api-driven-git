import { Router } from 'express';
import HealthController from "@/controllers/health/health.controller";

const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get("/", healthController.health);

export { healthRouter };
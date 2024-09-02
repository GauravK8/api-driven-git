import { Router } from "express";
import GitController from "@/controllers/git/git.controller";

const gitRouter = Router();
const gitController = new GitController();

gitRouter.post("/clone", gitController.clone);
gitRouter.get("/config/:projectId", gitController.config);
gitRouter.get("/status/:projectId", gitController.status);
gitRouter.get("/branches/:projectId", gitController.branches);

export { gitRouter };

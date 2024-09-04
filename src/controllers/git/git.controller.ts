import logger from '@/utils/logger';
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import simpleGit, { SimpleGit } from 'simple-git';

export default class GitController {
  public async clone(req: Request, res: Response): Promise<Response> {
    const { cloneUrl } = req.body;

    if (!cloneUrl) {
      return res.status(400).json('cloneUrl is required');
    }

    const projectId = randomUUID();

    const localPath = join(process.env.CLONE_PATH, projectId);

    const response = await simpleGit().clone(cloneUrl, localPath);

    logger.info('clone response ::', response);

    return res.status(201).json({
      status: 'SUCCESS',
      message: `Git clone is successful for ${cloneUrl}`,
      data: { projectId },
    });
  }

  public async config(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json('projectId is required');
    }

    const localPath = join(process.env.CLONE_PATH, projectId);

    const git: SimpleGit = simpleGit(localPath, {
      binary: 'git',
    });

    const config = await git.listConfig();
    logger.info('config ::', config.values);

    const url = await git.getConfig('remote.origin.url');
    logger.info('git url ::', url.value);

    return res.status(201).json({
      status: 'SUCCESS',
      message: `Git config fetched`,
      data: { remoteUrl: url.value },
    });
  }

  public async status(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json('projectId is required');
    }

    const localPath = join(process.env.CLONE_PATH, projectId);

    const git: SimpleGit = simpleGit(localPath, {
      binary: 'git',
    });

    const status = await git.status();

    logger.info('git status ::', status);

    return res.status(201).json({
      status: 'SUCCESS',
      message: `Git status fetched`,
      data: { status },
    });
  }

  public async branches(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    if (!projectId) {
      return res.status(400).json('projectId is required');
    }

    const localPath = join(process.env.CLONE_PATH, projectId);

    const git: SimpleGit = simpleGit(localPath, {
      binary: 'git',
    });

    const branches = await git.branch();

    logger.info('branches ::', branches);

    return res.status(201).json({
      status: 'SUCCESS',
      message: `Git branches fetched`,
      data: { branches },
    });
  }
}

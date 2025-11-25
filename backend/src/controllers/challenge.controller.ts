import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const prisma = new PrismaClient();

export const getChallenges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { difficulty, type, tags } = req.query;

    const challenges = await prisma.challenge.findMany({
      where: {
        ...(difficulty && { difficulty: difficulty as any }),
        ...(type && { type: type as any }),
        ...(tags && { tags: { hasSome: (tags as string).split(',') } }),
        isOfficial: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        type: true,
        tags: true,
        xpReward: true,
        createdAt: true,
      },
    });

    res.json(challenges);
  } catch (error) {
    next(error);
  }
};

export const getChallenge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { slug },
    });

    if (!challenge) {
      throw new AppError(404, 'Challenge not found');
    }

    // Don't send solution code to client
    const { solutionCode, ...challengeData } = challenge;

    res.json(challengeData);
  } catch (error) {
    next(error);
  }
};

export const submitChallenge = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { code, testResults, passed, timeTaken } = req.body;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      throw new AppError(404, 'Challenge not found');
    }

    // Create submission
    const submission = await prisma.challengeSubmission.create({
      data: {
        userId: req.user!.id,
        challengeId: id,
        code,
        passed,
        testResults,
        timeTaken: timeTaken || 0,
      },
    });

    // Award XP if passed
    if (passed) {
      await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          xpPoints: { increment: challenge.xpReward },
          lastActivityDate: new Date(),
        },
      });
    }

    res.json(submission);
  } catch (error) {
    next(error);
  }
};

import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const prisma = new PrismaClient();

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        bio: true,
        xpPoints: true,
        streakDays: true,
        createdAt: true,
        lastActivityDate: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, bio, avatarUrl } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...(username && { username }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl && { avatarUrl }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        bio: true,
        xpPoints: true,
        streakDays: true,
        createdAt: true,
        lastActivityDate: true,
      },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getProgress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.user!.id },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            topic: true,
          },
        },
      },
    });

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

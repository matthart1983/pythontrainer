import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const prisma = new PrismaClient();

export const getLessons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topic, difficulty } = req.query;

    const lessons = await prisma.lesson.findMany({
      where: {
        ...(topic && { topic: topic as string }),
        ...(difficulty && { difficulty: difficulty as any }),
      },
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        difficulty: true,
        estimatedTime: true,
        orderIndex: true,
        topic: true,
        prerequisites: true,
        createdAt: true,
      },
    });

    res.json(lessons);
  } catch (error) {
    next(error);
  }
};

export const getLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const lesson = await prisma.lesson.findUnique({
      where: { slug },
      include: {
        exercises: true,
      },
    });

    if (!lesson) {
      throw new AppError(404, 'Lesson not found');
    }

    res.json(lesson);
  } catch (error) {
    next(error);
  }
};

export const completeLesson = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { timeSpent } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
    });

    if (!lesson) {
      throw new AppError(404, 'Lesson not found');
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: req.user!.id,
          lessonId: id,
        },
      },
      update: {
        completed: true,
        completionDate: new Date(),
        timeSpent: timeSpent || 0,
      },
      create: {
        userId: req.user!.id,
        lessonId: id,
        completed: true,
        completionDate: new Date(),
        timeSpent: timeSpent || 0,
      },
    });

    // Award XP
    await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        xpPoints: { increment: 10 },
        lastActivityDate: new Date(),
      },
    });

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

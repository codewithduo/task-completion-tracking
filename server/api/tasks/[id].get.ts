import type { H3Event } from 'h3'
import { Prisma } from '@prisma/client'
import prismaClient from '../../database/prismaClient'

const taskWithOverview = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    taskOverview: true,
  },
})
export type TaskWithOverview = Prisma.TaskGetPayload<typeof taskWithOverview>

export default defineEventHandler(async (event: H3Event): Promise<TaskWithOverview> => {
  protectRoute(event)

  const id = Number(event.context.params?.id)

  const task: TaskWithOverview | null = await prismaClient.task.findUnique({
    where: { id },
    include: {
      taskOverview: true,
    },
  })

  if (!task) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    })
  }

  return task
})

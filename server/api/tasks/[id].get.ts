import type { H3Event } from 'h3'
import { Prisma } from '@prisma/client'
import prismaClient from '../../database/prismaClient'

const taskRelation = Prisma.validator<Prisma.TaskArgs>()({
  include: {
    taskOverview: true,
    taskEdgeCases: true,
  },
})
export type TaskRelation = Prisma.TaskGetPayload<typeof taskRelation>

export default defineEventHandler(async (event: H3Event): Promise<TaskRelation> => {
  protectRoute(event)

  const id = Number(event.context.params?.id)

  const task: TaskRelation | null = await prismaClient.task.findUnique({
    where: { id },
    include: {
      taskOverview: true,
      taskEdgeCases: true,
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

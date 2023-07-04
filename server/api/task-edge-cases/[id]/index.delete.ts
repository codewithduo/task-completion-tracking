import type { H3Event } from 'h3'
import type { TaskEdgeCase } from '@prisma/client'
import prismaClient from '../../../database/prismaClient'

export default defineEventHandler(async (event: H3Event): Promise<TaskEdgeCase> => {
  protectRoute(event)

  const id = Number(event.context.params?.id)

  const taskEdgeCase: TaskEdgeCase | null = await prismaClient.taskEdgeCase.findUnique({
    where: { id },
  })

  if (!taskEdgeCase) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    })
  }

  await prismaClient.taskEdgeCase.delete({
    where: { id },
  })

  return taskEdgeCase
})

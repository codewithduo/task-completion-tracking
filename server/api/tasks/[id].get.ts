import type { H3Event } from 'h3'
import type { Task } from '@prisma/client'
import prismaClient from '../../database/prismaClient'

export default defineEventHandler(async (event: H3Event): Promise<Task> => {
  protectRoute(event)

  const id = Number(event.context.params?.id)

  const task: Task | null = await prismaClient.task.findUnique({
    where: { id },
  })

  if (!task) {
    throw createError({
      statusCode: 404,
      message: 'Task not found',
    })
  }

  return task
})

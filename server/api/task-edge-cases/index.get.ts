import type { H3Event } from 'h3'
import type { TaskEdgeCase } from '@prisma/client'
import prismaClient from '../../database/prismaClient'

export default defineEventHandler(async (event: H3Event): Promise<TaskEdgeCase[]> => {
  protectRoute(event)

  const query = getQuery(event)
  const taskId = +query.taskId

  const taskEdgeCases = await prismaClient.taskEdgeCase.findMany({
    where: { taskId },
  })

  return taskEdgeCases
})

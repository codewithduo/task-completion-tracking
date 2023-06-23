import type { H3Event } from 'h3'
import type { TaskOverview } from '@prisma/client'
import prismaClient from '~/server/database/prismaClient'

interface CreateTaskOverviewData {
  taskId: number
  userInterface: string
  taskBehavior: string
  taskInteraction: string
}

export default defineEventHandler(async (event: H3Event) => {
  protectRoute(event)

  const body: CreateTaskOverviewData = await readBody(event)
  const { userInterface, taskBehavior, taskInteraction } = body
  const taskId = Number(event.context.params?.id)

  const task: TaskOverview = await prismaClient.taskOverview.create({
    data: {
      taskId,
      userInterface,
      taskBehavior,
      taskInteraction,
    },
  })

  return task
})

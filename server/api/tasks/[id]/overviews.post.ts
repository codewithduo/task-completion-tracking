import type { H3Event } from 'h3'
import prismaClient from '../../../database/prismaClient'

interface CreateOrUpdateTaskOverviewDto {
  userInterface: string
  taskBehavior: string
  taskInteraction: string
}

export default defineEventHandler(async (event: H3Event) => {
  protectRoute(event)

  const createOrUpdateTaskOverviewDto: CreateOrUpdateTaskOverviewDto = await readBody(event)
  const taskId = Number(event.context.params?.id)

  const taskOverview = await prismaClient.taskOverview.upsert({
    where: { taskId },
    create: { ...createOrUpdateTaskOverviewDto, taskId },
    update: createOrUpdateTaskOverviewDto,
  })

  return taskOverview
})

import type { H3Event } from 'h3'
import prismaClient from '../../database/prismaClient'

export interface CreateTaskEdgeCaseDto {
  taskId: number
  name: string
  solution: string
}

export default defineEventHandler(async (event: H3Event) => {
  protectRoute(event)

  const createTaskEdgeCaseDto: CreateTaskEdgeCaseDto = await readBody(event)
  const taskEdgeCase = await prismaClient.taskEdgeCase.create({
    data: createTaskEdgeCaseDto,
  })

  return taskEdgeCase
})

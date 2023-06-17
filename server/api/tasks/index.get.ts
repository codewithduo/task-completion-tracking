import type { H3Event } from 'h3'
import type { Task } from '@prisma/client'
import { REQUEST_USER_KEY } from '../../constants'
import prismaClient from '../../database/prismaClient'

export default defineEventHandler(async (event: H3Event): Promise<Task[]> => {
  protectRoute(event)

  const { email: userEmail } = event.context[REQUEST_USER_KEY]

  const tasks = await prismaClient.task.findMany({
    where: { userEmail },
  })

  return tasks
})

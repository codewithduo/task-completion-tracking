import type { H3Event } from 'h3'
import type { Task } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { REQUEST_USER_KEY } from '../../constants'
import prismaClient from '../../database/prismaClient'

function createTask(name: string, description: string, userEmail: string) {
  return Prisma.validator<Prisma.TaskCreateInput>()({
    name,
    description,
    userEmail,
  })
}

export default defineEventHandler(async (event: H3Event): Promise<Task> => {
  const body = await readBody(event)
  const { name, description } = body

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      message: 'Missing task name or task description',
    })
  }

  const { email: userEmail } = event.context[REQUEST_USER_KEY]
  const task: Task = await prismaClient.task.create({
    data: createTask(name, description, userEmail),
  })

  return task
})

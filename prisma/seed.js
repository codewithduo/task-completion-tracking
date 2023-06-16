import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.task.createMany({
    data: [
      {
        name: 'Implement get tasks api',
        description: 'GET api/tasks returns all tasks, filter by user email',
        userEmail: 'tranduong3701@gmail.com',
      },
      {
        name: 'Implement get task api',
        description: 'GET api/tasks returns task by id',
        userEmail: 'tranduong3701@gmail.com',
      },
      {
        name: 'Implement create task api',
        description: 'POST api/tasks create new task',
        userEmail: 'tranduong3701@gmail.com',
      }
    ],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

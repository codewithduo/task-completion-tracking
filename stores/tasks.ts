import type { Task } from '@prisma/client'
import type { CreateTaskData } from '~/server/api/tasks/index.post'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  const fetchTasks = async () => {
    const { data, error } = await useFetch<Task[]>('/api/tasks', {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value)
      return alert(error)

    tasks.value = data.value as Task[]
  }

  const createTask = async (createTaskData: CreateTaskData) => {
    const { data, error } = await useFetch<Task>('/api/tasks', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskData,
    })

    if (error.value)
      return alert(error)

    tasks.value.push(data.value as Task)
  }

  return { tasks, fetchTasks, createTask }
})

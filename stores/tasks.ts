import type { Task } from '@prisma/client'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>()

  const fetchTasks = async () => {
    const { data, error } = await useFetch<Task[]>('/api/tasks', {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value)
      return alert(error)

    tasks.value = data.value as Task[]
  }

  return { tasks, fetchTasks }
})

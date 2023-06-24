import type { Task } from '@prisma/client'
import type { CreateTaskData } from '~/server/api/tasks.post'
import type { TaskWithOverview } from '~/server/api/tasks/[id].get'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const task = ref<TaskWithOverview>()

  const fetchTasks = async () => {
    const { data, error } = await useFetch<Task[]>('/api/tasks', {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value)
      return alert(error)

    tasks.value = data.value as Task[]
  }

  const fetchTask = async (id: number) => {
    const { data, error } = await useFetch<TaskWithOverview>(`/api/tasks/${id}`, {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value)
      return alert(error)

    task.value = data.value as TaskWithOverview
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

  const deleteTask = async (id: number) => {
    const { error } = await useFetch<Task>(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value)
      return alert(error)

    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  return { task, tasks, fetchTasks, createTask, deleteTask, fetchTask }
})

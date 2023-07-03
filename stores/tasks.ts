import type { Task } from '@prisma/client'
import type { CreateTaskData } from '~/server/api/tasks.post'
import type { TaskRelation } from '~/server/api/tasks/[id].get'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const task = ref<TaskRelation>()

  const fetchTasks = async () => {
    const { data, error } = await useFetch<Task[]>('/api/tasks', {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    tasks.value = data.value as Task[]
  }

  const fetchTask = async (id: number) => {
    const { data, error } = await useFetch<TaskRelation>(`/api/tasks/${id}`, {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    task.value = data.value as TaskRelation
  }

  const createTask = async (createTaskData: CreateTaskData) => {
    const { data, error } = await useFetch<Task>('/api/tasks', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskData,
    })

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    tasks.value.push(data.value as Task)

    useNotification({
      message: 'Create task successfully!',
    })
  }

  const deleteTask = async (id: number) => {
    const { error } = await useFetch<Task>(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    tasks.value = tasks.value.filter(task => task.id !== id)

    useNotification({
      message: 'Delete task successfully!',
    })
  }

  return { task, tasks, fetchTasks, createTask, deleteTask, fetchTask }
})

import type { Task, TaskEdgeCase, TaskOverview } from '@prisma/client'
import type { CreateTaskEdgeCaseDto } from './../server/api/task-edge-cases/index.post'
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
    // taskEdgeCases.value = task.value.taskEdgeCases
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

  const createTaskEdgeCase = async (
    createTaskEdgeCaseData: CreateTaskEdgeCaseDto,
  ) => {
    const { data, error } = await useFetch<TaskEdgeCase>(
      '/api/task-edge-cases',
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: createTaskEdgeCaseData,
      },
    )

    if (error.value) {
      return useNotification({
        type: 'error',
        message: error.value.message,
      })
    }

    task.value!.taskEdgeCases.push(data.value as TaskEdgeCase)

    useNotification({
      message: 'Task edge case created successfully!',
    })
  }

  const deleteTaskEdgeCase = async (id: number) => {
    const { error } = await useFetch<TaskEdgeCase>(
      `/api/task-edge-cases/${id}`,
      {
        method: 'DELETE',
        headers: useRequestHeaders(['cookie']),
      },
    )

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    task.value!.taskEdgeCases = task.value!.taskEdgeCases.filter(
      taskEdgeCase => taskEdgeCase.id !== id,
    )

    useNotification({
      message: 'Delete successfully!',
    })
  }

  const createOrUpdateTaskOverview = async (
    taskId: number,
    createTaskOverviewData: any,
  ) => {
    const { error } = await useFetch<TaskOverview>(
      `/api/tasks/${taskId}/overviews`,
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: createTaskOverviewData,
      },
    )

    if (error.value) {
      return useNotification({
        type: 'error',
        message: error.value.message,
      })
    }

    useNotification({
      message: 'Task overview updated successfully!',
    })
  }

  return {
    task,
    tasks,
    fetchTasks,
    createTask,
    deleteTask,
    fetchTask,
    createTaskEdgeCase,
    deleteTaskEdgeCase,
    createOrUpdateTaskOverview,
  }
})

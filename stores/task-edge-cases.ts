import type { TaskEdgeCase } from '@prisma/client'
import type { CreateTaskEdgeCaseDto } from '~/server/api/task-edge-cases/index.post'

export const useTaskEdgeCaseStore = defineStore('task-edge-cases', () => {
  const taskEdgeCases = ref<TaskEdgeCase[]>([])

  const fetchTaskEdgeCases = async (taskId: number) => {
    const { data, error } = await useFetch<TaskEdgeCase[]>(`/api/task-edge-cases?taskId=${taskId}`, {
      headers: useRequestHeaders(['cookie']),
    })

    if (error.value) {
      return useNotification({
        message: error.value.message,
        type: 'error',
      })
    }

    taskEdgeCases.value = data.value as TaskEdgeCase[]
  }

  const createTaskEdgeCase = async (createTaskEdgeCaseData: CreateTaskEdgeCaseDto) => {
    const { data, error } = await useFetch<TaskEdgeCase>('/api/task-edge-cases', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskEdgeCaseData,
    })

    if (error.value) {
      return useNotification({
        type: 'error',
        message: error.value.message,
      })
    }

    taskEdgeCases.value.push(data.value as TaskEdgeCase)

    useNotification({
      message: 'Task edge case created successfully!',
    })
  }

  return { createTaskEdgeCase, fetchTaskEdgeCases, taskEdgeCases }
})

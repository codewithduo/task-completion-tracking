import type { TaskEdgeCase } from '@prisma/client'
import type { CreateTaskEdgeCaseDto } from '~/server/api/task-edge-cases/index.post'

export const useTaskEdgeCaseStore = defineStore('task-edge-cases', () => {
  const createTaskEdgeCase = async (createTaskEdgeCaseData: CreateTaskEdgeCaseDto) => {
    const { error } = await useFetch<TaskEdgeCase>('/api/task-edge-cases', {
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

    useNotification({
      message: 'Task edge case created successfully!',
    })
  }

  return { createTaskEdgeCase }
})

import type { TaskOverview } from '@prisma/client'

export const useTaskOverviewsStore = defineStore('task-overviews', () => {
  const createOrUpdateTaskOverview = async (taskId: number, createTaskOverviewData: any) => {
    const { error } = await useFetch<TaskOverview>(`/api/tasks/${taskId}/overviews`, {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskOverviewData,
    })

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

  return { createOrUpdateTaskOverview }
})

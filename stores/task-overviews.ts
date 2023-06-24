import type { TaskOverview } from '@prisma/client'

export const useTaskOverviewsStore = defineStore('task-overviews', () => {
  const createOrUpdateTaskOverview = async (taskId: number, createTaskOverviewData: any) => {
    const { error } = await useFetch<TaskOverview>(`/api/tasks/${taskId}/overviews`, {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskOverviewData,
    })

    if (error.value)
      return alert(error)
  }

  return { createOrUpdateTaskOverview }
})

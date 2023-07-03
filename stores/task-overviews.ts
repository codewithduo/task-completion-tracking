import type { TaskOverview } from '@prisma/client'
import { useNotificationStore } from './notifications'

export const useTaskOverviewsStore = defineStore('task-overviews', () => {
  const notificationStore = useNotificationStore()
  const { addNotification } = notificationStore

  const createOrUpdateTaskOverview = async (taskId: number, createTaskOverviewData: any) => {
    const { error } = await useFetch<TaskOverview>(`/api/tasks/${taskId}/overviews`, {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: createTaskOverviewData,
    })

    if (error.value) {
      return addNotification({
        id: useUniqueId(),
        type: 'error',
        message: error.value.message,
      })
    }

    addNotification({
      id: useUniqueId(),
      type: 'success',
      message: 'Task overview updated successfully!',
    })
  }

  return { createOrUpdateTaskOverview }
})

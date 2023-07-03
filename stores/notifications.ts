import type { Notification } from '~/types/notification'

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  const addNotification = (notification: Notification) => {
    notifications.value.push(notification)
  }

  const removeNotification = (notificationId: string) => {
    notifications.value = notifications.value.filter(({ id }) => id !== notificationId)
  }

  return {
    notifications,
    addNotification,
    removeNotification,
  }
})

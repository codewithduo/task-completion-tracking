<script setup lang="ts">
import type { Notification } from '~/types/notification'
import { useNotificationStore } from '~/stores/notifications'
import { NOTIFICATION_ICON, NOTIFICATION_TIMEOUT } from '~/constants/notification'

const props = defineProps<{
  notification: Notification
}>()

const notificationType = computed(() => {
  return `-${props.notification.type}`
})

const timeout = ref()
const notificationStore = useNotificationStore()
const { removeNotification } = notificationStore

onMounted(() => {
  timeout.value = setTimeout(() => {
    removeNotification(props.notification.id)
  }, NOTIFICATION_TIMEOUT)
})

onUnmounted(() => {
  clearTimeout(timeout.value)
})
</script>

<template>
  <div class="toast-container" role="alert">
    <div class="icon" :class="notificationType">
      <Icon :name="NOTIFICATION_ICON[notification.type]" size="20" />
    </div>
    <div class="message">
      {{ notification.message }}
    </div>
    <button type="button" class="button-close" @click="removeNotification(notification.id)">
      <span class="sr-only">Close</span>
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.toast-container {
  @apply flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow shadow-md;

  > .icon {
    @apply inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-l
  }

  > .icon.-success {
    @apply text-green-400 bg-green-100
  }

  > .icon.-error {
    @apply text-red-500 bg-red-100
  }

  > .icon.-warning {
    @apply text-orange-500 bg-orange-100
  }

  > .message {
    @apply ml-3 text-sm font-normal
  }

  > .button-close {
    @apply ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8
  }
}
</style>

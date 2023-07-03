<script setup lang="ts">
import { useNotificationStore } from '~/stores/notifications'

const notificationStore = useNotificationStore()

const { notifications } = storeToRefs(notificationStore)
</script>

<template>
  <div class="notification-container">
    <AppNotification
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :notification="notification"
    />
  </div>
</template>

<style scoped lang="scss">
.notification-container {
  position: fixed;
  top: 0;
  right: 0;
  margin-right: 32px;
  margin-top: 100px;
}
</style>

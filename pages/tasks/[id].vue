<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const taskId = +route.params.id
const tasksStore = useTasksStore()
const { task } = storeToRefs(tasksStore)
await tasksStore.fetchTask(taskId)
</script>

<template>
  <div class="task-details-page">
    <div class="task-steps">
      <TaskStepList />
    </div>
    <div class="step-content">
      <NuxtPage :task="task" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-details-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  > .task-steps {
    display: flex;
    gap: 16px;
    text-align: center;
  }

  > .step-content {
    background-color: $light-color;
    flex-grow: 1;
  }
}
</style>

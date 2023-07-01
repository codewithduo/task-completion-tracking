<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'

definePageMeta({
  middleware: 'auth',
})

const steps = [
  {
    name: 'Understand',
    path: 'understand',
  },
  {
    name: 'Edge Case',
    path: 'edge-cases',
  },
  {
    name: 'Estimation',
    path: 'estimation',
  },
  {
    name: 'Solve',
    path: 'solve',
  },
  {
    name: 'Implement',
    path: 'implement',
  },
  {
    name: 'Test',
    path: 'test',
  },
]

function isActiveStep(path: string) {
  return useRoute().path.includes(path)
}

const route = useRoute()
const taskId = +route.params.id
const tasksStore = useTasksStore()
const { task } = storeToRefs(tasksStore)
await tasksStore.fetchTask(taskId)
</script>

<template>
  <div class="task-details-page">
    <div class="task-steps">
      <NuxtLink
        v-for="step in steps"
        :key="step.path"
        :to="step.path"
        class="step-item"
        :class="{ '-active': isActiveStep(step.path) }"
      >
        {{ step.name }}
      </NuxtLink>
    </div>
    <div class="step-content">
      <NuxtPage :task="task" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-details-page {
  > .task-steps {
    display: flex;
    gap: 16px;
    text-align: center;
    margin-top: 16px;
  }

  > .step-content {
    background-color: $light-color;
  }
}

.task-steps {
  > .step-item {
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 8px;
    min-width: 200px;
    justify-content: center;
  }

  > .step-item.-active {
    border-bottom: 3px solid $primary-color;
    color: $primary-color;
  }
}
</style>

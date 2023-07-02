<script setup lang="ts">
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

const route = useRoute()
function isActiveStep(path: string) {
  return route.path.includes(path)
}
</script>

<template>
  <div class="task-steps-container">
    <ul class="step-list">
      <li class="step-item">
        <NuxtLink
          v-for="step in steps"
          :key="step.path"
          :to="step.path"
          class="link"
          :class="{ '-active': isActiveStep(step.path) }"
        >
          {{ step.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.task-steps-container {
  @apply text-sm font-medium text-center text-gray-500 border-b border-gray-200
}

.step-list {
  @apply flex flex-wrap -mb-px
}

.step-item {
  @apply mr-2
}

.link {
  @apply inline-block p-4 px-8 border-b-2 border-transparent rounded-t-lg hover:text-blue-600
}

.link.-active {
  @apply text-blue-600 border-b-2 border-blue-600
}
</style>

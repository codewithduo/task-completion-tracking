<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const steps = [
  {
    id: 1,
    name: 'Understand',
    path: 'understand',
  },
  {
    id: 2,
    name: 'Solve',
    path: 'solve',
  },
  {
    id: 3,
    name: 'Implement',
    path: 'implement',
  },
  {
    id: 4,
    name: 'Test',
    path: 'test',
  },
]

const activeStep = ref(1)
const setActiveStep = (stepId: number) => activeStep.value = stepId
</script>

<template>
  <div class="task-details-page">
    <div class="task-steps">
      <NuxtLink v-for="step in steps" :key="step.id" :to="step.path" class="step-item" @click="setActiveStep(step.id)">
        <div class="order" :class="{ '-active': step.id === activeStep }">
          {{ step.id }}
        </div>
        <h3 class="name">
          {{ step.name }}
        </h3>
      </NuxtLink>
    </div>
    <div class="step-content">
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-details-page {
  display: flex;
  gap: 32px;

  > .step-content {
    background-color: $light-color;
    flex-grow: 1;
  }

  > .task-steps {
    display: flex;
    height: 78vh;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    background-color: $light-color;
  }
}

.task-steps {
  > .step-item {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px;
  }

  > .step-item > .order {
    height: 50px;
    width: 50px;
    background-color: $gray-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $light-color;
  }

  > .step-item > .order.-active {
    background-color: $primary-color;
  }
}
</style>

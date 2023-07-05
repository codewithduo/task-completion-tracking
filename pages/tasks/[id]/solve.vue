<script setup lang="ts">
import type { TaskRelation } from '~/server/api/tasks/[id].get'

const props = defineProps<{
  task: TaskRelation
}>()

const taskSolvingForm = reactive({
  taskScope: props.task.taskSolving?.taskScope || '',
  taskContext: props.task.taskSolving?.taskContext || '',
  optimalSolution: props.task.taskSolving?.optimalSolution || '',
  isNeedPoc: props.task.taskSolving?.isNeedPoc || false,
})
</script>

<template>
  <section class="task-solving">
    <form class="overview">
      <fieldset class="fieldset">
        <div class="form-item">
          <label class="label">What is the task scope? <span class="text-xs font-normal text-gray-500">Refer to the following questions: What already exists? What needs to be done?</span></label>
          <textarea
            v-model="taskSolvingForm.taskScope"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">What is the task context? <span class="text-xs font-normal text-gray-500">Refer to the following points if relevant: Parts of the system that interact with your code, code you can learn from or use, relevant coding standards (naming conventions etc.)</span></label>
          <textarea
            v-model="taskSolvingForm.taskContext"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">The optimal solution?</label>
          <textarea
            v-model="taskSolvingForm.optimalSolution"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item -horizontal">
          <input v-model="taskSolvingForm.isNeedPoc" type="checkbox" class="checkbox">
          <label for="checked-checkbox" class="ml-2 text-sm font-medium text-gray-900">Need P.O.C?</label>
        </div>
      </fieldset>
    </form>
  </section>
</template>

<style scoped lang="scss">
.task-solving {
  @apply p-4;

  > .overview > .fieldset > .description {
    @apply text-lg font-medium
  }

  > .overview > .fieldset > .form-item {
    @apply p-3
  }
  > .overview > .fieldset > .form-item.-horizontal {
    @apply flex items-center
  }

  > .overview > .fieldset > .form-item > .label {
    @apply block mb-1 text-sm font-medium text-gray-900
  }

  > .overview > .fieldset > .form-item > .input {
    @apply block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500;
  }

  > .overview > .fieldset > .form-item > .checkbox {
    @apply w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2;
  }
}
</style>

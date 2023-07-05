<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'
import type { TaskRelation } from '~/server/api/tasks/[id].get'

const props = defineProps<{
  task: TaskRelation
}>()

const route = useRoute()
const taskId = +route.params.id

const taskOverviewForm = reactive({
  userInterface: props.task.taskOverview?.userInterface || '',
  taskBehavior: props.task.taskOverview?.taskBehavior || '',
  taskInteraction: props.task.taskOverview?.taskInteraction || '',
})

const tasksStore = useTasksStore()

const userInterfaceRef = ref()
const isEditMode = ref(!props.task.taskOverview)
function openEditMode() {
  isEditMode.value = true
}

const closeEditMode = () => (isEditMode.value = false)

async function handleCreateOrUpdateTaskOverview() {
  if (
    !taskOverviewForm.userInterface
    && !taskOverviewForm.taskBehavior
    && !taskOverviewForm.taskInteraction
  ) {
    return useNotification({
      message: 'Please fill all fields',
      type: 'error',
    })
  }

  await tasksStore.createOrUpdateTaskOverview(taskId, taskOverviewForm)
  closeEditMode()
}

onMounted(() => {
  if (isEditMode.value)
    userInterfaceRef.value.focus()
})

onUpdated(() => {
  if (isEditMode.value)
    userInterfaceRef.value.focus()
})
</script>

<template>
  <section class="task-understand">
    <form class="overview">
      <fieldset class="fieldset">
        <legend class="description">
          Describe your understanding of the task (Refer to the following
          questions if relevant)
        </legend>
        <div class="form-item">
          <label class="label">What does the user see?</label>
          <textarea
            ref="userInterfaceRef"
            v-model="taskOverviewForm.userInterface"
            :disabled="!isEditMode"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">How does each part behave?</label>
          <textarea
            v-model="taskOverviewForm.taskBehavior"
            :disabled="!isEditMode"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">What interaction is there with other components?</label>
          <textarea
            v-model="taskOverviewForm.taskInteraction"
            :disabled="!isEditMode"
            class="input"
            rows="4"
          />
        </div>
      </fieldset>
      <div class="actions">
        <button
          v-if="!isEditMode"
          class="edit"
          type="button"
          @click="openEditMode"
        >
          <Icon name="uil:edit" /> Edit
        </button>
        <button
          v-if="isEditMode"
          class="save"
          type="button"
          @click="handleCreateOrUpdateTaskOverview"
        >
          <Icon name="uil:save" /> Save
        </button>

        <button
          v-if="isEditMode"
          class="cancel"
          type="button"
          @click="closeEditMode"
        >
          <Icon name="uil:multiply" /> Cancel
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped lang="scss">
.task-understand {
  padding: 16px;

  > .overview > .fieldset > .description {
    @apply text-lg font-medium
  }

  > .overview > .fieldset > .form-item {
    @apply p-3
  }

  > .overview > .fieldset > .form-item > .label {
    @apply block mb-2 text-sm font-medium text-gray-900
  }

  > .overview > .fieldset > .form-item > .input {
    @apply block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500;
  }

  > .overview > .actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }

  > .overview > .actions > .edit {
    @apply focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-1
  }
  > .overview > .actions > .save {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-1
  }

  > .overview > .actions > .cancel {
    @apply text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center gap-1
  }
}
</style>

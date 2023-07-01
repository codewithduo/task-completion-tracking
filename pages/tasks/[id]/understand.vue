<script setup lang="ts">
import type { TaskRelation } from '~/server/api/tasks/[id].get'
import { useTaskOverviewsStore } from '~/stores/task-overviews'

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

const taskOverviewStore = useTaskOverviewsStore()

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
  )
    return alert('Please fill all fields')

  await taskOverviewStore.createOrUpdateTaskOverview(taskId, taskOverviewForm)
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

  > .overview > .fieldset {
    border-color: $gray-color;
  }

  > .overview > .fieldset > .form-item {
    width: 100%;
    padding: 16px;
  }
  > .overview > .fieldset > .form-item > .label {
    display: block;
  }
  > .overview > .fieldset > .form-item > .input {
    width: 100%;
    border: 1px solid $gray-color;
    padding: 8px;
    border-radius: 4px;
  }

  > .overview > .actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }

  > .overview > .actions > .button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    color: $light-color;
    border-radius: 4px;
  }

  > .overview > .actions > .edit {
    @extend .button;
    background-color: $danger-color;
  }
  > .overview > .actions > .save {
    @extend .button;
    background-color: $primary-color;
  }
  > .overview > .actions > .cancel {
    @extend .button;
    background-color: $secondary-color;
  }
}
</style>

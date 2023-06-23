<script setup lang="ts">
import { useTaskOverviewsStore } from '~/stores/task-overviews'

const route = useRoute()
const taskId = +route.params.id

const taskOverviewForm = reactive({
  userInterface: '',
  taskBehavior: '',
  taskInteraction: '',
})

const taskOverviewStore = useTaskOverviewsStore()

function handleCreateTask() {
  if (
    !taskOverviewForm.userInterface
    || !taskOverviewForm.taskBehavior
    || !taskOverviewForm.taskInteraction
  )
    return alert('Please fill all fields')

  taskOverviewStore.createTaskOverview(taskId, taskOverviewForm)
}
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
            v-model="taskOverviewForm.userInterface"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">How does each part behave?</label>
          <textarea
            v-model="taskOverviewForm.taskBehavior"
            class="input"
            rows="4"
          />
        </div>
        <div class="form-item">
          <label class="label">What interaction is there with other components?</label>
          <textarea
            v-model="taskOverviewForm.taskInteraction"
            class="input"
            rows="4"
          />
        </div>
      </fieldset>
      <div class="actions">
        <button class="submit" type="button" @click="handleCreateTask">
          Save
        </button>
        <button class="cancel" type="button">
          Cancel
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
    box-shadow: $box-shadow-small;

    &:focus {
      outline: none;
    }
  }

  > .overview > .actions {
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }

  > .overview > .actions > .submit {
    padding: 8px 20px;
    background-color: $primary-color;
    color: $light-color;
    border-radius: 4px;
  }
  > .overview > .actions > .cancel {
    padding: 8px 20px;
    background-color: $secondary-color;
    color: $light-color;
    border-radius: 4px;
  }
}
</style>

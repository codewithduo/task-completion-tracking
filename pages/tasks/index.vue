<script setup lang="ts">
import { format } from 'date-fns'
import { useTasksStore } from '~/stores/tasks'
import type { CreateTaskData } from '~/server/api/tasks.post'
import { useNotificationStore } from '~/stores/notifications'

definePageMeta({
  middleware: 'auth',
})

const taskColumns = [
  {
    name: 'id',
    label: 'ID',
    width: '5%',
  },
  {
    name: 'name',
    label: 'Name',
    width: '20%',
  },
  {
    name: 'description',
    label: 'Description',
    width: '45%',
  },
  {
    name: 'createdAt',
    label: 'Created At',
    width: '10%',
  },
  {
    name: 'updatedAt',
    label: 'Updated At',
    width: '10%',
  },
  {
    name: 'actions',
    label: 'Actions',
    width: '10%',
  },
]

const tasksStore = useTasksStore()
const notificationStore = useNotificationStore()

const { tasks } = storeToRefs(tasksStore)
await tasksStore.fetchTasks()

const isVisible = ref(false)
const showModal = () => (isVisible.value = true)
const hideModal = () => (isVisible.value = false)

const createTaskData = reactive<CreateTaskData>({
  name: '',
  description: '',
})

function resetCreateTaskForm() {
  createTaskData.name = ''
  createTaskData.description = ''
}

async function handleCreateTask() {
  if (!createTaskData.name || !createTaskData.description) {
    return notificationStore.addNotification({
      id: useUniqueId(),
      message: 'Please fill all fields',
      type: 'error',
    })
  }

  await tasksStore.createTask(createTaskData)

  hideModal()
  resetCreateTaskForm()
}

async function handleDeleteTask(id: number) {
  await tasksStore.deleteTask(id)
}

function handleNavigateToTask(id: number) {
  return navigateTo(`/tasks/${id}/understand`)
}
</script>

<template>
  <div class="tasks-page">
    <div class="toolbar">
      <h2 class="title">
        My Tasks
      </h2>
      <div class="actions">
        <button type="button" class="create" @click="showModal">
          <Icon name="uil:plus" /> New
        </button>
      </div>
    </div>
    <div class="content">
      <table class="task-table">
        <thead class="head">
          <tr class="row">
            <th
              v-for="column in taskColumns"
              :key="column.name"
              class="cell"
              :width="column.width"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body">
          <tr
            v-for="(task, index) in tasks"
            :key="task.id"
            class="row"
            :class="{ '-stripe': index % 2 === 1 }"
          >
            <td class="cell">
              {{ `#${task.id}` }}
            </td>
            <td class="cell">
              {{ task.name }}
            </td>
            <td class="cell">
              {{ task.description }}
            </td>
            <td class="cell">
              {{ format(new Date(task.createdAt), "MMM do yyyy") }}
            </td>
            <td class="cell">
              {{ format(new Date(task.updatedAt!), "MMM do yyyy") }}
            </td>
            <td class="cell">
              <button type="button" @click="handleNavigateToTask(task.id)">
                <Icon name="uil:location-arrow" color="blue" />
              </button>
              <button type="button">
                <Icon name="uil:edit" />
              </button>
              <button type="button" @click="handleDeleteTask(task.id)">
                <Icon color="red" name="uil:trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isVisible" class="task-modal">
      <div class="overlay" @click="hideModal" />
      <div class="modal-card">
        <div class="header">
          <h4 class="title">
            Create new Task
          </h4>
          <button type="button" @click="hideModal">
            <Icon name="uil:multiply" />
          </button>
        </div>
        <div class="body">
          <form class="form">
            <div class="form-item">
              <label class="label" for="name">Name</label>
              <input
                id="name"
                v-model="createTaskData.name"
                class="input"
                type="text"
              >
            </div>
            <div class="form-item">
              <label class="label" for="description">Description</label>
              <textarea
                id="description"
                v-model="createTaskData.description"
                class="input"
                type="textarea"
                rows="3"
              />
            </div>
          </form>
        </div>
        <div class="actions">
          <button type="button" class="save" @click="handleCreateTask">
            <Icon name="uil:save" /> Save
          </button>
          <button type="button" class="cancel" @click="hideModal">
            <Icon name="uil:multiply" /> Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks-page {
  > .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  > .toolbar > .title {
    color: $primary-color;
  }

  > .toolbar > .actions > .create {
    background-color: $primary-color;
    color: $light-color;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: $box-shadow-small;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  > .content {
    overflow: auto;
    height: 600px;
  }
}

.task-table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;

  > .body > .row.-stripe {
    background-color: $light-color;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tbody tr:hover {
    background-color: $gray-color !important;
    cursor: default;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid $gray-color;
  }

  th {
    background-color: lighten($color: $primary-color, $amount: 40%);
    font-weight: bold;
    text-transform: uppercase;
  }
}

.task-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  > .overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
    background-color: $dark-color;
  }

  > .modal-card {
    position: relative;
    max-width: 50%;
    margin: auto;
    background-color: $light-color;
    padding: 16px;
    margin-top: 10%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: $box-shadow-small;
  }

  > .modal-card > .header {
    display: flex;
    justify-content: space-between;
  }

  > .modal-card > .header {
    font-size: 20px;
  }

  > .modal-card > .body > .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  > .modal-card > .body > .form > .form-item {
    margin-bottom: 16px;
    width: 100%;
  }

  > .modal-card > .body > .form > .form-item > .label {
    display: block;
  }

  > .modal-card > .body > .form > .form-item > .input {
    width: 100%;
    padding: 8px;
    border: 1px solid $gray-color;
    border-radius: 4px;

    &:focus {
      outline: none;
    }
  }

  > .modal-card > .actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }

  > .modal-card > .actions > .save {
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: $primary-color;
    color: $light-color;
    border: none;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: $box-shadow-small;
    gap: 4px;
  }
  > .modal-card > .actions > .cancel {
    display: flex;
    gap: 8px;
    align-items: center;
    background-color: $secondary-color;
    color: $light-color;
    border: none;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: $box-shadow-small;
    gap: 4px;
  }
}
</style>

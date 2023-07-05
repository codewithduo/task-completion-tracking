<script setup lang="ts">
import { format } from 'date-fns'
import { useTasksStore } from '~/stores/tasks'
import type { CreateTaskData } from '~/server/api/tasks.post'

definePageMeta({
  middleware: 'auth',
})

const taskColumns = [
  {
    value: 'id',
    label: 'ID',
    width: '5%',
  },
  {
    value: 'value',
    label: 'Name',
    width: '20%',
  },
  {
    value: 'description',
    label: 'Description',
    width: '45%',
  },
  {
    value: 'createdAt',
    label: 'Created At',
    width: '10%',
  },
  {
    value: 'updatedAt',
    label: 'Updated At',
    width: '10%',
  },
  {
    value: '',
    label: '',
    width: '10%',
  },
]

const tasksStore = useTasksStore()
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
    return useNotification({
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
    <div class="tasks-container">
      <table class="table">
        <caption class="caption">
          My Tasks
          <p class="extra">
            Tracking your tasks like professional developer
          </p>
        </caption>
        <thead class="head">
          <tr class="row">
            <th
              v-for="column in taskColumns"
              :key="column.value"
              :width="column.width"
              scope="col"
              class="cell"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="task in tasks" :key="task.id" class="row">
            <td scope="row" class="cell">
              #{{ task.id }}
            </td>
            <td scope="row" class="cell">
              {{ task.name }}
            </td>
            <td class="cell">
              {{ task.description }}
            </td>
            <td class="cell">
              {{ format(new Date(task.createdAt), 'dd/MM/yyyy') }}
            </td>
            <td class="cell">
              {{ format(new Date(task.updatedAt!), 'dd/MM/yyyy') }}
            </td>
            <td class="cell text-right">
              <Icon
                class="button text-blue-600 mr-2"
                name="uil:location-arrow"
                size="15"
                @click="handleNavigateToTask(task.id)"
              />
              |
              <Icon
                class="button text-red-600 ml-2"
                name="uil:trash"
                size="15"
                @click="handleDeleteTask(task.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="create-button" @click="showModal">
        <Icon name="uil:plus" size="20" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks-page {
  @apply h-full relative bg-white;
}

.tasks-container {
  @apply sm:rounded-lg h-[550px] overflow-y-auto p-4;

  > .table {
    @apply w-full text-sm text-left text-gray-500 table-fixed;
  }

  > .table > .caption {
    @apply text-lg font-semibold text-left text-gray-900 bg-white sticky top-0;
  }

  > .table > .caption > .extra {
    @apply mb-3 text-sm font-normal text-gray-500;
  }

  > .table > .head {
    @apply text-xs text-gray-700 uppercase bg-blue-100 sticky top-16;
  }

  > .table > .head > .row > .cell {
    @apply px-6 py-4;
  }

  > .table > .body > .row {
    @apply bg-white border-b hover:bg-gray-50;
  }

  > .table > .body > .row > .cell {
    @apply px-6 py-4 font-medium text-gray-900 whitespace-pre-line;
  }

  > .table > .body > .row > .cell > .button {
    @apply font-medium hover:underline cursor-pointer;
  }

  > .create-button {
    @apply absolute top-6 right-7 flex items-center justify-center text-white bg-blue-600 rounded-full w-10 h-10 hover:bg-blue-700;
  }
}
</style>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'
import type { TaskRelation } from '~/server/api/tasks/[id].get'

const props = defineProps<{
  task: TaskRelation
}>()

const columns = [
  {
    label: 'Id',
    value: 'id',
    width: '5%',
  },
  {
    label: 'Name',
    value: 'name',
    width: '30%',
  },
  {
    label: 'Solution',
    value: 'solution',
    width: '50%',
  },
  {
    label: '',
    value: 'action',
    width: '10%',
  },
]

const { isVisible, showModal, hideModal } = useModal()

const createTaskEdgeCaseData = reactive({
  taskId: props.task.id,
  name: '',
  solution: '',
})

function resetCreateTaskEdgeCaseData() {
  createTaskEdgeCaseData.name = ''
  createTaskEdgeCaseData.solution = ''
}

const tasksStore = useTasksStore()
const { createTaskEdgeCase, deleteTaskEdgeCase } = tasksStore

async function handleCreateTaskEdgeCase() {
  if (!createTaskEdgeCaseData.name || !createTaskEdgeCaseData.solution) {
    return useNotification({
      message: 'Please fill all fields',
      type: 'error',
    })
  }

  await createTaskEdgeCase({
    ...createTaskEdgeCaseData,
  })

  hideModal()
  resetCreateTaskEdgeCaseData()
}
</script>

<template>
  <div class="task-edge-cases">
    <div class="edge-cases">
      <table class="table">
        <caption class="caption">
          Edge Cases
          <p class="extra">
            Think what none trivial state the task might have. Describe them and
            their solution.
          </p>
        </caption>
        <thead class="head">
          <tr class="row">
            <th
              v-for="column in columns"
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
          <tr
            v-for="edgeCase in task.taskEdgeCases"
            :key="edgeCase.id"
            class="row"
          >
            <td scope="row" class="cell">
              #{{ edgeCase.id }}
            </td>
            <td scope="row" class="cell">
              {{ edgeCase.name }}
            </td>
            <td class="cell">
              {{ edgeCase.solution }}
            </td>
            <td class="cell text-right">
              <Icon class="button text-blue-600 mr-2" name="uil:edit" size="15" />
              |
              <Icon
                class="button text-red-600 ml-2"
                name="uil:trash"
                size="15"
                @click="deleteTaskEdgeCase(edgeCase.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" class="create-button" @click="showModal">
        <Icon name="uil:plus" size="20" />
      </button>
      <div v-if="isVisible" class="modal-container">
        <div class="overlay">
          <!-- Modal content -->
          <div class="content">
            <button type="button" class="button-close" @click="hideModal">
              <Icon name="uil:multiply" size="20" />
            </button>
            <div class="card">
              <h3 class="header">
                Add new Edge Case
              </h3>
              <form class="body">
                <div class="form-item">
                  <label for="name" class="label">Name</label>
                  <textarea
                    id="name"
                    v-model="createTaskEdgeCaseData.name"
                    rows="3"
                    class="input"
                    placeholder="Write your edge case here..."
                  />
                </div>
                <div class="form-item">
                  <label for="solution" class="label">Solution</label>
                  <textarea
                    id="solution"
                    v-model="createTaskEdgeCaseData.solution"
                    rows="6"
                    class="input"
                    placeholder="Write your solution here..."
                  />
                </div>
              </form>
              <div class="footer">
                <button
                  type="submit"
                  class="button-save"
                  @click="handleCreateTaskEdgeCase"
                >
                  Save
                </button>
                <button type="button" class="button-cancel" @click="hideModal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-edge-cases {
  @apply p-4 h-full relative;
}

.edge-cases {
  @apply sm:rounded-lg h-[550px] overflow-y-auto;

  > .table {
    @apply w-full text-sm text-left text-gray-500 table-fixed;
  }

  > .table > .caption {
    @apply py-1 text-lg font-semibold text-left text-gray-900 bg-white sticky top-0;
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

.modal-container {
  @apply flex justify-center items-center bg-[rgba(147,147,147,0.5)] fixed top-0 left-0 right-0 bottom-0 w-full z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full;

  > .overlay {
    @apply relative w-full max-w-2xl max-h-full;
  }

  > .overlay > .content {
    @apply relative bg-white rounded-lg shadow w-[100%];
  }

  > .overlay > .content > .button-close {
    @apply absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center;
  }

  > .overlay > .content > .card {
    @apply px-6 py-6 lg:px-8;
  }

  > .overlay > .content > .card > .header {
    @apply mb-4 text-xl font-medium text-gray-900;
  }
  > .overlay > .content > .card > .body {
    @apply space-y-6;
  }

  > .overlay > .content > .card > .body > .form-item > .label {
    @apply block mb-2 text-sm font-medium text-gray-900;
  }

  > .overlay > .content > .card > .body > .form-item > .input {
    @apply block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500;
  }

  > .overlay > .content > .card > .footer {
    @apply text-right mt-4;
  }
  > .overlay > .content > .card > .footer > .button-save {
    @apply mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center;
  }

  > .overlay > .content > .card > .footer > .button-cancel {
    @apply py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200;
  }
}
</style>

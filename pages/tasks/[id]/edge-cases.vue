<script setup lang="ts">
import type { TaskRelation } from '~/server/api/tasks/[id].get'

const props = defineProps<{
  task: TaskRelation
}>()

const columns = [
  {
    label: 'Id',
    value: 'id',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Solution',
    value: 'solution',
  },
  {
    label: '',
    value: 'action',
  },
]

const edgeCases = computed(() => {
  return props.task.taskEdgeCases
})
</script>

<template>
  <div class="task-edge-cases">
    <div class="edge-cases">
      <table class="table">
        <caption class="caption">
          Edge Cases
          <p class="extra">
            Think what none trivial state the task might have. Describe them and their solution.
          </p>
        </caption>
        <thead class="head">
          <tr class="row">
            <th v-for="column in columns" :key="column.value" scope="col" class="cell">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="edgeCase in edgeCases" :key="edgeCase.id" class="row">
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
              <a href="#" class="font-medium text-blue-600 hover:underline"><Icon name="uil:edit" /> Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-edge-cases {
  height: 100%;
  @apply p-4
}

.edge-cases {
  @apply relative overflow-x-auto sm:rounded-lg h-full;

  > .table {
    @apply w-full text-sm text-left text-gray-500;
  }

  > .table > .caption {
    @apply py-1 text-lg font-semibold text-left text-gray-900 bg-white
  }

  > .table > .caption > .extra {
    @apply mb-3 text-sm font-normal text-gray-500
  }

  > .table > .head {
    @apply text-xs text-gray-700 uppercase bg-gray-50
  }

  > .table > .head > .row > .cell {
    @apply px-6 py-4
  }

  > .table > .body > .row {
    @apply bg-white border-b
  }
  > .table > .body > .row > .cell {
    @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap
  }
}
</style>

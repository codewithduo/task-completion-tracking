<script setup lang="ts">
import { format } from 'date-fns'
import { useTasksStore } from '~/stores/tasks'

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
const { tasks } = storeToRefs(tasksStore)
await tasksStore.fetchTasks()
</script>

<template>
  <div class="tasks-page">
    <h2 class="title">
      My Tasks
    </h2>
    <div class="content">
      <table class="task-table">
        <thead class="head">
          <tr class="row">
            <th v-for="column in taskColumns" :key="column.name" class="cell" :width="column.width">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body">
          <tr v-for="(task, index) in tasks" :key="task.id" class="row" :class="{ '-stripe': index % 2 === 1 }">
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
              {{ format(new Date(task.createdAt), 'MMM do yyyy') }}
            </td>
            <td class="cell">
              {{ format(new Date(task.updatedAt!), 'MMM do yyyy') }}
            </td>
            <td class="cell">
              <button type="button">
                <Icon name="uil:location-arrow" />
              </button>
              <button type="button">
                <Icon name="uil:edit" />
              </button>
              <button type="button">
                <Icon name="uil:trash-alt" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tasks-page {
  > .title {
    margin-bottom: 12px;
    color: $primary-color;
  }
  > .content {
    overflow: auto;
    height: 446px;
  }
}

.task-table {
  border-collapse: collapse;
  font-size: 12px;
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
</style>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    class="elevation-1"
    item-key="id"
  >
    <!-- Role Column -->
    <template #item.role="{ item }">
      <v-chip :color="item.role === 'admin' ? 'primary' : 'grey'" dark>
        {{ item.role }}
      </v-chip>
    </template>

    <!-- Actions Column -->
    <template #item.actions="{ item }">
      <v-btn v-if="item.role !== 'admin'" icon color="primary" @click="$emit('edit', item)" style="margin-right: 10px;font-size: 10px; width: 40px;height: 40px;">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn v-if="item.role !== 'admin'" icon color="error" @click="$emit('delete', item)" style="margin-right: 10px;font-size: 10px; width: 40px;height: 40px;">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <!-- No Data -->
    <template #no-data>
      <v-alert type="info">No users found.</v-alert>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

interface Item {
  id: string
  name: string
  email: string
  role: string
}

const props = defineProps<{
  items: Item[]
  loading?: boolean
}>()

// Static headers, including actions column
const headers = [
  { text: "Name", value: "name" },
  { text: "Email", value: "email" },
  { text: "Role", value: "role" },
  { text: "Actions", value: "actions", sortable: false },
]
</script>

<template>
  <v-container fluid>
    <!-- Users Card -->
    <v-card class="pa-4">
      <v-card-title>
        <v-row class="align-center justify-space-between" style="width: 100%;padding: 15px;">
          <span class="text-h6">Users</span>
          <v-btn color="primary" @click="openDrawer">Create User</v-btn>
          <v-btn color="primary" @click="logOut">Log Out</v-btn>
        </v-row>
      </v-card-title>


      <!-- Advanced Data Table -->
      <AdvancedDataTable
        :headers="headers"
        :items="users"
        :loading="loading"
        @edit="editUser"
        @show="showUser"
        @delete="deleteUser"
      />
    </v-card>

    <!-- User Drawer -->
    <UserModal
      v-model="drawerOpen"
      :user="editingUser"
      @saved="fetchUsers"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import api from "@/api/http"
import AdvancedDataTable from "@/components/AdvancedDataTable.vue"
import UserModal from "@/components/UserModal.vue"
import { toast } from "vue3-toastify"
import { useRouter } from "vue-router"
const router = useRouter() //
const users = ref<any[]>([])
const loading = ref(false)
const drawerOpen = ref(false)
const headers = [
  { title: "Name", key: "name" },
  { title: "Email", key: "email" },
  { title: "Role", key: "role" },
  { title: "Actions", key: "actions", sortable: false },
]

const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const fetchUsers = async (page = 1) => {
  try {
    loading.value = true
    const res = await api.get(`/users?page=${page}`)
    users.value = res.data.data.data
    pagination.value = {
      current_page: res.data.data.current_page,
      last_page: res.data.data.last_page,
      per_page: res.data.data.per_page,
      total: res.data.data.total
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const openDrawer = () => {
  drawerOpen.value = true
}

const editingUser = ref<any | null>(null)

const openCreateModal = () => {
  editingUser.value = null
  drawerOpen.value = true
}

const editUser = (user: any) => {
  editingUser.value = user
  drawerOpen.value = true
}

const showUser = (user: any) => {
  console.log("Show user details:", user)
}

const deleteUser = async (user: any) => {
  if (!confirm(`Delete ${user.name}?`)) return
  await api.delete(`/users/${user.id}`)
  fetchUsers() // refresh list
}

const logOut = async () => {
  if (!confirm("Are you sure you want to log out?")) return

  try {
    await api.post("/tenants/logout")
  } catch (error: any) {
    console.error(error)
  } finally {
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push("/")
  }
}


onMounted(fetchUsers)
</script>

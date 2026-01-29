<template>
  <v-dialog v-model="dialogValue" max-width="500px" persistent>
    <v-card>
      <v-card-title class="text-h6">
        {{ form.id ? "Edit User" : "Create User" }}
        <v-spacer />
        <v-btn icon @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="userForm" lazy-validation>
          <v-text-field
            label="Name"
            v-model="form.name"
            :rules="[v => !!v || 'Name is required']"
          />
          <v-text-field
            label="Email"
            v-model="form.email"
            :rules="[v => !!v || 'Email is required']"
          />
          <v-text-field
            label="Password"
            v-model="form.password"
            type="password"
            :rules="[v => !!v || 'Password is required']"
          />
          <v-text-field
            label="Role"
            v-model="form.role"
            readonly
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="saveUser" :loading="loading">
          {{ form.id ? "Update" : "Create" }}
        </v-btn>
        <v-btn text @click="closeModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue"
import api from "@/api/http"
import { toast } from "vue3-toastify"



const props = defineProps<{
  modelValue: boolean
  user?: { id?: string; name?: string; email?: string; role?: string } | null
}>()

const emit = defineEmits(["update:modelValue", "saved"])


const form = ref({
  id: "",
  name: "",
  email: "",
  password: "",
  role: "user",
})

const loading = ref(false)


watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = { ...newUser }
    } else {
      form.value = { id: "", name: "", email: "", role: "user" }
    }
  },
  { immediate: true }
)


const dialogValue = ref(false)
watch(() => props.modelValue, (val) => (dialogValue.value = val))
watch(dialogValue, (val) => emit("update:modelValue", val))

function closeModal() {
  dialogValue.value = false
  form.value = { id: "", name: "", email: "", role: "user" }
}

async function saveUser() {
  try {
    loading.value = true

    if (form.value.id) {

      await api.put(`/users/${form.value.id}`, {
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
        password: form.value.password,
      })
      toast.success("User updated successfully!")
    } else {

      await api.post("/users", {
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
        password: form.value.password,
      })
      toast.success("User created successfully!")
    }

    emit("saved")
    closeModal()
  } catch (error: any) {
    console.error(error)
    toast.error(error.response?.data?.message || "Something went wrong")
  } finally {
    loading.value = false
  }
}


</script>

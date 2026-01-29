<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Create New Tenant</v-card-title>

          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="Tenant Name"
                v-model="tenant.name"
                :rules="[v => !!v || 'Name is required']"
              />
              <v-text-field
                label=" Email"
                v-model="tenant.email"
                :rules="[v => !!v || 'Email is required']"
              />
              <v-text-field
                label=" Password"
                type="password"
                v-model="tenant.password"
                :rules="[v => !!v || 'Password is required']"
              />
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="createTenant" :loading="loading">
              Create Tenant
            </v-btn>
            <v-btn text @click="goBack">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api/http'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const loading = ref(false)

const tenant = ref({
  name: '',
  email: '',
  password: ''
})

const createTenant = async () => {
  if (!tenant.value.name || !tenant.value.email || !tenant.value.password) {
    toast.error('All fields are required')
    return
  }

  try {
    loading.value = true
    const res = await api.post('/tenants/register', {
      name: tenant.value.name,
      email: tenant.value.email,
      password: tenant.value.password
    })
    toast.success('Tenant created successfully')
    router.push('/')
  } catch (error: any) {
    console.error(error)
    toast.error(error.response?.data?.message || 'Failed to create tenant')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

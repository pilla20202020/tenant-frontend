<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Tenant Login</v-card-title>

          <v-card-text>
            <v-text-field label="Email" v-model="email" />
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            />
          </v-card-text>

          <v-card-actions>
            <v-btn
              :loading="auth.loading"
              block
              color="primary"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>

          <v-divider class="my-4" />

          <v-card-actions>
            <v-btn block color="secondary" @click="goToCreateTenant">
              Create New Tenant
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
  await auth.login(email.value, password.value)
  router.push('/users')
}

// Navigate to tenant creation page
const goToCreateTenant = () => {
  router.push('/tenants/create')
}
</script>

<template>
  <v-app>
    <v-main>
      <!-- Vue Router renders the correct view here -->
      <router-view />
    </v-main>

    <!-- Optional footer -->
    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
</script>

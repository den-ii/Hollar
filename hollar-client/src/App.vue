<script setup lang="ts">
import AuthModal from '@/components/auth/AuthModal.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div>
    <auth-modal v-if="auth.authModal" />
    <router-view name="navbar" />
    <div class="mt-[100px]">
      <router-view />
    </div>
    <router-view name="trendbar" />
    <router-view name="couTrendbar" />
  </div>
</template>

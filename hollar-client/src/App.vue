<script setup lang="ts">
import AuthModal from '@/components/auth/AuthModal.vue'
import PostModal from '@/components/post/PostModal.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useModalStore } from './stores/modals'

const auth = useAuthStore()
const modals = useModalStore()
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
    <post-modal v-show="modals.postModal" />
  </div>
</template>

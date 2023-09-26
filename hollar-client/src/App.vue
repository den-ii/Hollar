<script setup lang="ts">
import AuthModal from '@/components/auth/AuthModal.vue'
import PostModal from '@/components/post/PostModal.vue'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useModalStore } from './stores/modals'
import { useRefreshStore } from './stores/refresh'
import { useRoute } from 'vue-router'

import Ads from '@/components/Ads.vue'
import RoomsHeader from '@/components/rooms/RoomsHeader.vue'

const auth = useAuthStore()
// const route = useRoute()
// const id = String(route.params.id)
const route = useRoute()
const id = route.params.id as string
const modals = useModalStore()
</script>

<template>
  <div class="dark:bg-darks text-[.95rem]">
    <auth-modal v-if="auth.authModal" />
    <router-view name="navbar" />
    <div class="dark:bg-darks">
      <router-view :key="id" />
    </div>
    <router-view name="trendbar" />
    <router-view name="couTrendbar" />
    <post-modal v-show="modals.postModal" />
  </div>
</template>

<style scoped>
.ads {
  width: calc(100% - 400px);
}
</style>

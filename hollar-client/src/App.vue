<script setup lang="ts">
import Home from './views/Home.vue'
import Navbar from './components/Navbar.vue'
import AuthModal from './components/AuthModal.vue'
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Trendbar from './components/Trendbar.vue'
import CouTrendbar from './components/CouTrendbar.vue'
import { useAuthStore } from './stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div>
    <auth-modal v-if="auth.authModal" />
    <navbar />
    <div class="mt-[100px]">
      <!-- <home /> -->
      <router-view />
    </div>
    <trendbar />
    <cou-trendbar />
  </div>
  <!-- <RouterView /> -->
</template>

<template>
  <header
    class="shadow fixed h-[60px] top-0 left-0 right-0 w-full flex items-center bg-white dark:bg-gray-800 z-40"
  >
    <nav class="w-screen flex items-center justify-between px-3">
      <!-- LOGO -->
      <div>
        <h1 class="font-bold text-xl text-base font-QuickSand">HOLLAR&#8482;</h1>
      </div>

      <!-- <div class="flex gap-5 text-lg">
        <p class="font-Poppins text-gray-700">Top Rooms</p>
        <p class="font-Poppins text-gray-700">MyWatchlist</p>
      </div> -->
      <!-- UNSIGNED LIST -->
      <div class="" v-if="!auth.isAuth">
        <button
          class="bg-base text-white rounded-lg py-2 px-3 font-semibold"
          @click.prevent="auth.authModal = true"
        >
          Log in?
        </button>
      </div>
      <div class="flex items-center gap-4" v-else>
        <button class="relative cursor-pointer">
          <i class="fa-regular fa-bell text-2xl text-gray-600"></i
          ><span
            class="absolute -top-2 left-3 bg-base text-white w-5 h-5 rounded-full flex items-center justify-center text-sm"
            >3</span
          >
        </button>
        <button v-if="auth.user?.avatar?.length" @click="router.push('/profile')">
          <img
            :src="auth.user?.avatar"
            :class="`w-[45px] h-[45px] flex items-center justify-center cursor-pointer rounded-full ${auth.authBg}`"
          />
        </button>
        <button
          v-else
          :class="`w-[45px] h-[45px] flex items-center justify-center cursor-pointer rounded-full ${auth.authBg}`"
          @click="router.push('/profile')"
        >
          <p class="text-lg font-bold text-white">{{ dp }}</p>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const dp = auth.name
const router = useRouter()
</script>

<template>
  <div
    class="shadow dark:shadow-barshadow trend fixed top-[60px] left-0 w-[200px] px-2 flex flex-col justify-between dark:bg-darks"
  >
    <div class="pt-6 flex flex-col gap-5 items-center">
      <router-link
        to="/"
        class="bg-gray-200 dark:bg-gray-300 shadow flex items-center justify-center w-[47px] h-[47px] rounded-full"
      >
        <i class="fa-solid fa-house text-lg text-black"></i>
      </router-link>
      <button
        v-if="auth.isAuth"
        class="bg-green-700 shadow w-[47px] h-[47px] rounded-full"
        @click="modals.postModal = true"
      >
        <i class="fa-solid fa-pencil text-lg text-white"></i>
        <!-- <i class="fa-solid fa-pen-to-square text-white text-lg"></i> -->
      </button>
      <router-link
        to="/feed"
        class="bg-gray-200 dark:bg-gray-300 shadow flex items-center justify-center w-[47px] h-[47px] rounded-full"
      >
        <i class="fa-solid fa-clipboard-list text-lg text-black"></i>
      </router-link>
      <button
        class="bg-gray-200 dark:bg-gray-300 shadow w-[47px] h-[47px] rounded-full"
        @click.prevent="mode.toggleDark()"
      >
        <span v-if="mode.isDark"> <i class="fa-solid fa-moon text-black"></i></span>

        <span v-else><i class="fa-solid fa-sun text-lg text-black"></i></span>
      </button>
    </div>
    <div class="px-2">
      <h1
        class="bg-base w-full text-white rounded-tr-lg rounded-tl-lg text-center mb-2 text-[1rem] font-bold py-1 mt-3 dark:font-semibold cursor-pointer dark:text-gray-100 font-Raleway"
      >
        Top 10 UK
      </h1>
      <ul class="text-[1.1rem] mb-3">
        <li
          v-for="trend in Trends"
          :key="trend"
          class="dark:hover:text-purple-50dark:text-gray-200 cursor-pointer"
        >
          {{ trend }}
        </li>
      </ul>
      <!-- <p class="text-center text-sm">See more</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modals'
import { useModeStore } from '@/stores/mode'

import Trends from '@/assets/trends'
const auth = useAuthStore()
const modals = useModalStore()
const mode = useModeStore()
</script>

<template>
  <div
    class="shadow dark:shadow-barshadow trend fixed top-[60px] left-0 w-[200px] px-3 flex flex-col justify-between items-center dark:bg-darks"
  >
    <div class="pt-6 flex flex-col gap-5">
      <router-link
        to="/"
        class="bg-gray-200 dark:bg-gray-300 shadow flex items-center justify-center w-[50px] h-[50px] rounded-full"
      >
        <i class="fa-solid fa-house text-lg text-black"></i>
      </router-link>
      <button
        class="bg-green-700 shadow w-[50px] h-[50px] rounded-full"
        @click="modals.postModal = true"
      >
        <i class="fa-solid fa-pen-to-square text-white text-lg"></i>
      </button>
      <router-link
        to="/feed"
        class="bg-gray-200 dark:bg-gray-300 shadow flex items-center justify-center w-[50px] h-[50px] rounded-full"
      >
        <i class="fa-solid fa-clipboard-list text-lg text-black"></i>
      </router-link>
      <button
        class="bg-gray-200 dark:bg-gray-300 shadow w-[50px] h-[50px] rounded-full"
        @click.prevent="mode.toggleDark()"
      >
        <span v-if="mode.isDark"> <i class="fa-solid fa-moon text-black"></i></span>

        <span v-else><i class="fa-solid fa-sun text-lg text-black"></i></span>
      </button>
    </div>
    <div class="">
      <h1
        class="bg-base text-white rounded-lg text-center mb-2 text-lg font-bold py-1 mt-3 dark:font-semibold"
      >
        NG Top 10
      </h1>
      <ul class="text-lg">
        <li v-for="trend in Trends" :key="trend" class="dark:text-white">
          {{ trend }}
        </li>
      </ul>
      <p class="text-center text-sm">See more</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { useModalStore } from '@/stores/modals'
import { useModeStore } from '@/stores/mode'

import Trends from '@/assets/trends'

const modals = useModalStore()
const mode = useModeStore()
</script>

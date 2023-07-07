<template>
  <div
    class="shadow trend fixed top-[60px] left-0 w-[200px] px-3 flex flex-col justify-between items-center"
  >
    <div class="pt-6 flex flex-col gap-5">
      <router-link
        to="/"
        class="bg-gray-200 shadow flex items-center justify-center w-[50px] h-[50px] rounded-full"
      >
        <i class="fa-solid fa-house text-lg"></i>
      </router-link>
      <button
        class="bg-green-700 shadow w-[50px] h-[50px] rounded-full"
        @click="modals.postModal = true"
      >
        <i class="fa-solid fa-pen-to-square text-white text-lg"></i>
      </button>
      <router-link
        to="/feed"
        class="bg-gray-200 shadow flex items-center justify-center w-[50px] h-[50px] rounded-full"
      >
        <i class="fa-solid fa-clipboard-list text-lg"></i>
      </router-link>
      <button class="bg-gray-200 shadow w-[50px] h-[50px] rounded-full">
        <i class="fa-solid fa-sun text-lg"></i>
      </button>
    </div>
    <div class="">
      <h1 class="bg-base text-gray-100 rounded text-center mb-2 text-lg font-bold mt-3">
        NG Top Trendz
      </h1>
      <ul class="text-lg">
        <li v-for="trend in Trends" :key="trend" class="font-Raleway">
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
import Trends from '@/assets/trends'

const modals = useModalStore()
</script>

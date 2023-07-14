<template>
  <div
    class="shadow trend fixed top-[60px] right-0 w-[200px] px-4 flex flex-col justify-between dark:shadow-barshadow dark:bg-darks"
  >
    <div>
      <h1
        class="bg-base text-white rounded-lg text-center mb-2 text-lg font-bold mt-3 py-1 dark:font-semibold"
      >
        What's Trending?
      </h1>
      <ul class="text-lg">
        <li v-for="trend in Trends" :key="trend" class="dark:text-white">
          {{ trend }}
        </li>
      </ul>
    </div>
    <footer class="text-sm dark:text-gray-100">
      <p><a>Terms of Service</a></p>
      <p><a>Privacy Policy</a></p>
      <p>&copy; 2023 ALX</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Trends from '@/assets/trends'
</script>

<style></style>

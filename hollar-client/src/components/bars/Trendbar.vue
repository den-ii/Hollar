<template>
  <div class="shadow trend fixed top-[60px] right-0 w-[200px] px-4 flex flex-col justify-between">
    <div>
      <h1 class="bg-base text-gray-100 rounded text-center mb-2 text-lg font-bold mt-3">
        World Top Trendz
      </h1>
      <ul class="text-lg">
        <li v-for="trend in Trends" :key="trend" class="font-Raleway">
          {{ trend }}
        </li>
      </ul>
    </div>
    <footer class="text-sm">
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

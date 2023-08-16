<template>
  <div
    class="mt-6 rounded-lg shadow dark:shadow-barshadow dark:border dark:border-black"
    v-for="(room, index) in new Array(10)"
    :key="index"
  >
    <bg-skeleton><div class="h-[100px]"></div></bg-skeleton>

    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="animate-pulse flex items-center justify-between p-4">
      <!-- <div class="pulse rounded-lg w-[30px] h-[18px]"></div>

      <div class="pulse rounded-lg w-[100px] h-[30px]"></div>
      <div class="pulse rounded-lg w-[30px] h-[18px]"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import BgSkeleton from './BgSkeleton.vue'
</script>
<style scoped>
img {
  height: 100px;
  object-fit: cover;
  width: 100%;
}
</style>

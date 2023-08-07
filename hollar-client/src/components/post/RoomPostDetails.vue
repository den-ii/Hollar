<template>
  <div
    class="w-[300px] h-[150px] z-50 bg-white dark:bg-darks dark:border dark:border-white rounded-lg shadow"
  >
    <div class="bg-gray-200 h-[50%] dark:bg-black animate-pulse">
      <img :src="room?.cover" class="h-full rounded-lg w-full object-cover" alt="" />
    </div>
    <div class="px-1 py-2 text-center text-lg overflow-hidden font-semibold">
      {{ room?.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['room'])
</script>

<style scoped></style>

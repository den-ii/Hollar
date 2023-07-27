<template>
  <div class="w-[300px] h-[300px] rounded">
    <div class="bg-gray-200 h-[70%] dark:bg-black animate-pulse">
      <img :src="room?.cover" alt="" />
    </div>
    <div>
      {{ room.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['room'])
</script>

<style scoped></style>

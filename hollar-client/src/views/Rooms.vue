<template>
  <main class="max-w-[750px] mx-auto">
    <div>
      <rooms :rooms="true" />
    </div>
  </main>
</template>

<script setup lang="ts">
import Rooms from '@/components/rooms/Rooms.vue'
</script>

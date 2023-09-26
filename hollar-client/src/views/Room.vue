<template>
  <main class="max-w-[750px] mt-[100px] mx-auto min-h-[screen] pb-3" :key="id">
    <displayRoom :id="id" :key="id" />
  </main>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import displayRoom from '@/components/rooms/displayRoom.vue'

defineProps(['id'])
</script>

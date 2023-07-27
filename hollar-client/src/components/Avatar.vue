<template>
  <span v-if="!post" class="rounded-full bg-gray-500 animate-pulse" :class="size"></span>
  <span
    v-else-if="!src"
    class="rounded-full flex items-center justify-center bg-gray-400 font-bold text-white"
    :class="size"
  >
    {{ dp(dpName) }}
  </span>

  <span v-else>
    <img :src="src" class="object-cover rounded-full" :class="size" />
  </span>
</template>

<script setup lang="ts">
import { dp } from '@/components/post/utils'
defineProps(['src', 'post', 'size', 'dpName'])
</script>

<style scoped></style>

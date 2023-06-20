<template>
  <img
    :src="source"
    class="w-[30px] h-[30px]"
    :class="{ 'bg-purple-100 animate-pulse': !source }"
  />
</template>

<script setup lang="ts">
defineProps({
  source: String
})
</script>

<style scoped></style>

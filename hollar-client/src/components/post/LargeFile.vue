<template>
  <span
    class="fixed z-50 top-10 bg-base text-white py-1 px-2 font-Raleway text-center rounded left-50% font-semibold"
  >
    {{ content }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({ content: { type: String, required: true } })
</script>

<style scoped></style>

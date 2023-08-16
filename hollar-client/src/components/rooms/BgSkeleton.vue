<template>
  <div class="rounded-tl-lg rounded-tr-lg pulse dark:hidden">
    <slot></slot>
  </div>
  <div class="hidden dark:block rounded-tl-lg rounded-tr-lg darkpulse">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  header: Boolean
})
</script>

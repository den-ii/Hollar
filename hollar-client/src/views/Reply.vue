<template>
  <div class="max-w-[750px] mx-auto min-h-[screen] relative pb-[207px]">
    {{ id }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const { id } = route.params
</script>

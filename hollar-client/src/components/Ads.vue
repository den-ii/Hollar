<template>
  <video
    autoplay
    ref="video"
    muted
    controls
    playsinline
    poster="https://www.newsbugz.com/wp-content/uploads/2023/05/Extraction-2-Movie-4.jpg"
    class="rounded-xl"
    width="750"
  >
    <source src="../assets/ext.mp4" type="video/mp4" />
  </video>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const video = ref(null)

watch(video, () => {
  console.log(video)
})
</script>
<!-- autoplay
    muted
    controls

    playsinline -->

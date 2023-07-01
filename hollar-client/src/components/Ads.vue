<template>
  <div class="relative" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <video
      autoplay
      ref="video"
      muted
      loop
      playsinline
      poster="https://www.newsbugz.com/wp-content/uploads/2023/05/Extraction-2-Movie-4.jpg"
      class="rounded-xl"
      width="750"
    >
      <source src="../assets/ext.mp4" type="video/mp4" />
    </video>
    <span
      class="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] cursor-pointer"
      @click="playPause"
    >
      <i class="fa-solid fa-pause play text-base" v-show="play && playTag"></i>
      <i class="fa-solid fa-circle-play play text-base" v-show="!play"></i>
      ></span
    >
    <span class="flex gap-3 absolute bottom-3 right-3" v-if="hover">
      <span class="cursor-pointer" @click="volume">
        <i class="fa-solid fa-volume-xmark text-base side" v-if="muted"></i>
        <i class="fa-solid fa-volume-high side text-base" v-else></i>
      </span>
      <span class="cursor-pointer" @click="video.requestFullscreen"
        ><i class="fa-solid fa-expand text-base side"></i
      ></span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const video: any = ref(null)
const play = ref(true) //plays on render
const playTag = ref(false) //pause wouldn't sure except when hovered
const hover = ref(false)
const muted = ref(true)

function volume() {
  if (video.value && muted.value) {
    video.value.muted = false
    muted.value = false
  } else if (video.value && !muted.value) {
    video.value.muted = true
    muted.value = true
  }
}

function playPause() {
  // pause
  if (play.value) {
    play.value = false
    playTag.value = true
    video.value.pause()
  }
  // play
  else if (!play.value) {
    video.value.play()
    play.value = true
    playTag.value = false
  }
}
function mouseOver() {
  hover.value = true
  playTag.value = true
}
function mouseLeave() {
  setTimeout(() => {
    playTag.value = false
    hover.value = false
  }, 1000)
}

watch([video, hover], () => {
  // if (!play.value) {
  //   play.value = false
  //   setTimeout(() => {
  //     playTag.value = false
  //   }, 1000)
  // } else {
  //   play.value = true
  //   playTag.value = true
  // }
  console.log(hover)
  console.log(video)
})
</script>
<style scoped>
.play {
  font-size: 4rem;
}
.side {
  font-size: 1.5rem;
}
</style>
<!-- autoplay
    muted
    controls

    playsinline -->

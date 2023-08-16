<template>
  <div class="relative dark:bg-darks">
    <video
      autoplay
      ref="video"
      muted
      loop
      playsinline
      poster="https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQfZoOth5nUAKa5Enibc_9gqGFSqqXjypa10UoVE0TWiM69ek-mNXBIKx8YiB9GmClDlTTXilHehiLMHXT9U_m5PbBawmzrks62eysPRtPmFsH-9YkK5oR40phlHDSG3Zfl74rk9K6w7zOHr7EyfPJB88yf0.jpg?r=d0a"
      class="cursor-pointer bg-black"
      width=""
      @click="playPause"
      @dblclick="volume"
    >
      <source src="../assets/ext.mp4" type="video/mp4" />
    </video>
    <span
      class="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] cursor-pointer"
      @click="playPause"
    >
      <i class="fa-solid fa-pause play text-base" v-show="!play && playTag"></i>
      <i class="fa-solid fa-circle-play play text-base" v-show="play && playTag"></i>
      <i class="fa-solid fa-volume-xmark text-base side" v-show="muted && volumeTag"></i>
      <i class="fa-solid fa-volume-high side text-base" v-show="!muted && volumeTag"></i>
    </span>
    <!-- <span class="cursor-pointer" @click="video.requestFullscreen"
        ><i class="fa-solid fa-expand text-base side"></i
      ></span> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const video: any = ref(null)
const play = ref(true) //plays on render
const playTag = ref(false) //pause wouldn't sure except when hovered
const hover = ref(false)
const muted = ref(true)
const volumeTag = ref(false)

setTimeout(volume, 1500)
function volume() {
  if (video.value && muted.value) {
    video.value.muted = false
    muted.value = false
    playTag.value = false
    volumeTag.value = true

    setTimeout(() => {
      volumeTag.value = false
    }, 1000)
  } else if (video.value && !muted.value) {
    video.value.muted = true
    muted.value = true
    playTag.value = false
    volumeTag.value = true

    setTimeout(() => {
      volumeTag.value = false
    }, 1000)
  }
}

function playPause() {
  // pause
  if (play.value) {
    play.value = false
    playTag.value = true
    video.value.pause()
    volumeTag.value = false

    setTimeout(() => {
      playTag.value = false
    }, 1000)
  }
  // play
  else if (!play.value) {
    video.value.play()
    play.value = true
    playTag.value = true
    volumeTag.value = false

    setTimeout(() => {
      playTag.value = false
    }, 1000)
  }
}
// function mouseOver() {
//   hover.value = true
//   playTag.value = true
// }
function mouseLeave() {
  setTimeout(() => {
    playTag.value = false
    hover.value = false
  }, 1000)
}
function infiniteScroll() {
  const { scrollTop, offsetHeight } = document.documentElement
  if (scrollTop > 400) {
    if (play.value) {
      play.value = false
      playTag.value = true
      video.value.pause()
      volumeTag.value = false

      setTimeout(() => {
        playTag.value = false
      }, 1000)
    }
  }
}

// infinite scrollin
window.addEventListener('scroll', infiniteScroll)
onUnmounted(() => window.removeEventListener('scroll', infiniteScroll))

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
})
</script>
<style scoped>
.play {
  font-size: 2rem;
}
.side {
  font-size: 1.5rem;
}
</style>
<!-- autoplay
    muted
    controls

    playsinline -->

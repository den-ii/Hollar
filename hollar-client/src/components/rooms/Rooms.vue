<template>
  <div class="mb-5 cursor-pointer">
    <rooms-header @openRoomModal="$emit('openRoomModal')" />
    <div>
      <div class="mt-3 rounded-md shadow-md" @click="router.push(`/rooms/${name}`)">
        <img
          height="20"
          class="rounded-lg block"
          src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg"
          alt="poster"
        />
        <div class="flex justify-between p-4">
          <p>0 hollars</p>
          <h1 class="font-semibold">TAXI DRIVER</h1>
          <div class="flex gap-3">
            <p>0 likes</p>
            <p>0 dislikes</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RoomsHeader from './RoomsHeader.vue'
defineEmits(['openRoomModal'])

const name = ref('taxidriver')

const router = useRouter()
</script>

<style scoped>
img {
  height: 100px;
  object-fit: cover;
  width: 100%;
}
</style>

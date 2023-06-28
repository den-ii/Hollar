<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import Ads from '@/components/Ads.vue'
import Rooms from '@/components/rooms/Rooms.vue'
import AddRoom from '@/components/rooms/AddRoom.vue'

const open = ref(false)
</script>

<template>
  <main class="max-w-[750px] mx-auto">
    <div>
      <ads />
      <rooms @openRoomModal="open = true" />
    </div>
    <add-room v-if="open" @closeRoomModal="open = false" />
    <!-- <TheWelcome /> -->
  </main>
</template>

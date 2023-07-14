<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import Ads from '@/components/Ads.vue'
import Rooms from '@/components/rooms/Rooms.vue'
import AddRoom from '@/components/rooms/AddRoom.vue'
import { useRefreshStore } from '@/stores/refresh'

const open = ref(false)
const refresh = useRefreshStore()
</script>

<template>
  <main class="max-w-[750px] mx-auto dark:bg-darks dark:text-white">
    <div class="dark:bg-darks">
      <ads />
      <rooms @openRoomModal="open = true" :rooms="false" />
    </div>
    <add-room v-if="open" @closeRoomModal="open = false" />

    <!-- <TheWelcome /> -->
  </main>
</template>

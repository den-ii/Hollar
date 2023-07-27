<script setup lang="ts">
import { ref } from 'vue'
// import TheWelcome from '../components/TheWelcome.vue'
import Ads from '@/components/Ads.vue'
import Rooms from '@/components/rooms/Rooms.vue'
import RoomsHeader from '@/components/rooms/RoomsHeader.vue'
import AddRoom from '@/components/rooms/AddRoom.vue'
import { useRefreshStore } from '@/stores/refresh'

const open = ref(false)
const refresh = useRefreshStore()
</script>

<template>
  <main class="mx-auto ads mt-[50px]">
    <div class="relative">
      <ads class="" />
      <rooms-header
        @openRoomModal="open = true"
        class="h-[60px] absolute bottom-0 py-5 px-3 w-full backdrop-blur"
      />
    </div>
    <div class="max-w-[750px] mx-auto">
      <rooms @openRoomModal="open = true" :rooms="false" class="mt-3" />
      <add-room v-if="open" @closeRoomModal="open = false" />
    </div>
  </main>
  <!-- <main class="max-w-[750px] mx-auto dark:bg-darks dark:text-white">
    <div class="dark:bg-darks">
    </div>

  </main> -->
</template>

<template>
  <div
    class="mt-6 rounded-md shadow"
    v-for="room in result?.roomsPaginate"
    :key="room.id"
    @click="$emit('toRoom', room.name, room.id)"
  >
    <img
      class="rounded-tl-lg rounded-tr-lg block"
      :src="room.cover"
      alt="poster"
      v-if="room.cover"
    />
    <div v-else class="rounded-tl-lg rounded-tr-lg h-[100px] bg-gray-200 animate-pulse"></div>

    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="flex justify-between p-4 h-[60px]">
      <p class="font-Raleway">0 posts</p>
      <h1 class="font-semibold">{{ room.name.toUpperCase() }}</h1>
      <like-room :likes="room?.likes" :dislikes="room?.dislikes" :roomId="room?.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LikeRoom from './LikeRoom.vue'
defineEmits(['toRoom'])
const props = defineProps(['result'])
</script>
<style scoped>
img {
  height: 130px;
  object-fit: cover;
  width: 100%;
}
</style>

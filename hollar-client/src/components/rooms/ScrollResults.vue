<template>
  <div
    class="mt-6 rounded-md shadow dark:shadow-barshadow dark:border dark:border-black"
    v-for="room in result?.roomsPaginate"
    :key="room.id"
    @click="$emit('toRoom', room.name, room.id)"
  >
    <img
      class="rounded-tl-lg rounded-tr-lg block"
      :src="room.cover"
      alt="poster"
      loading="lazy"
      v-if="room.cover"
    />
    <div v-else class="rounded-tl-lg rounded-tr-lg h-[100px] bg-gray-200 animate-pulse"></div>

    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="flex justify-between p-4">
      <p class="font-Raleway">0 posts</p>
      <h1 class="font-semibold">{{ room.name.toUpperCase() }}</h1>
      <like-room
        :likesCount="room?.likesCount"
        :dislikesCount="room?.dislikesCount"
        :roomId="room?.id"
        :userLiked="room?.userLiked"
        :userDisliked="room?.userDisliked"
      />
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
  height: 100px;
  object-fit: cover;
  width: 100%;
}
</style>

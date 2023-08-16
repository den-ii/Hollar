<template>
  <div
    class="mt-6 rounded-lg shadow dark:shadow-barshadow dark:border dark:border-black"
    v-for="room in result?.roomsPaginate"
    :key="room.id"
    @click="$emit('toRoom', room.name, room.id)"
  >
    <bg-skeleton>
      <div class="rounded-tl-lg rounded-tr-lg h-[100px]">
        <img
          class="rounded-tl-lg rounded-tr-lg block"
          :src="room.cover"
          alt="poster"
          loading="lazy"
          ref="roomCover"
          @error="imageError"
          v-if="room.cover"
        />
      </div>
    </bg-skeleton>

    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="flex justify-between p-4">
      <p class="font-Raleway five flex items-center gap-1">
        <span>{{ room?.postsCount }}</span>
        <i class="fa-regular fa-comment"></i>
      </p>
      <h1 class="font-QuickSand text-[1rem] font-semibold">{{ room.name }}</h1>
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
import { ref } from 'vue'
import BgSkeleton from './BgSkeleton.vue'
import LikeRoom from './LikeRoom.vue'
import { imageError } from '../skeleton/utils'
defineEmits(['toRoom'])
const props = defineProps(['result'])
const roomCover: any = ref(null)
</script>
<style scoped>
img {
  height: 100px;
  object-fit: cover;
  width: 100%;
}
</style>

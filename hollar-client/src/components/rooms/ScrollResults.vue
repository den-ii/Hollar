<template>
  <div
    class="mt-6 rounded-md shadow"
    v-for="room in result?.roomsPaginate"
    :key="room.id"
    @click="$emit('toRoom', room.id)"
  >
    <img class="rounded-tl-lg rounded-tr-lg block" :src="room.cover" alt="poster" />
    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="flex justify-between p-4 h-[60px]">
      <p>0 holz</p>
      <h1 class="font-semibold">{{ room.name.toUpperCase() }}</h1>
      <div class="flex gap-3">
        <!-- likes -->
        <div class="flex items-center gap-1 cursor-pointer w-[40px]">
          <!-- <span>24</span><i class="fa-regular fa-thumbs-up"></i> -->
          <div class="flex items-center gap-1 hover:text-lg">
            <span>24</span>
            <i class="fa-solid fa-thumbs-up text-green-500 hover:text-lg"></i>
          </div>
        </div>
        <!-- dislikes -->
        <div class="flex items-center gap-1 hover:text-lg w-[40px]">
          <span>24</span>
          <i class="fa-solid fa-thumbs-down text-red-500 hover:text-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

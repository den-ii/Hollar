<template>
  <div>
    <div class="flex gap-3">
      <div>
        <span
          v-if="!props.post.author.avatar"
          class="w-[40px] h-[40px] rounded-full bg-gray-500 animate-pulse"
        ></span
        ><img v-else :src="props.post.author.avatar" class="w-[40px] h-[40px] rounded-full" />
      </div>
      <div class="w-[50%]">
        <div>@{{ props.post.author.username }}</div>
        <button class="block w-full bg-base rounded py-[0.4px] text-white text-center">
          follow
        </button>
      </div>
    </div>
    <div class="text-gray-700 mt-2">
      <i class="fa-solid fa-star text-yellow-500"></i>
      <p class="flex flex-wrap">
        {{ favourite }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['post'])

const favourite = computed(() => {
  if (props.post.author.favourite) {
    if (props.post.author.favourite.length > 14) {
      return props.post.author.favourite.slice(0, 14) + '...'
    } else {
      return props.post.author.favourite
    }
  } else return 'unknown'
})
</script>

<style scoped></style>

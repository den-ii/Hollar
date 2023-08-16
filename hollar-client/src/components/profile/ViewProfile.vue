<template>
  <div class="dark:bg-darks min-w-[200px] min-h-[120px] dark:shadow-barshadow p-2 z-50">
    <!-- {{ props.post }} -->
    <div class="flex">
      <div class="w-50px">
        <avatar
          :src="post?.authorDetails?.avatar"
          :post="post"
          size="w-[46px] h-[45px]"
          :dpName="post?.authorDetails?.fullName"
        />
        <!-- <span
          v-if="!props.post.author"
          class="w-[40px] h-[40px] rounded-full bg-gray-500 animate-pulse"
        ></span>
        <span
          v-else-if="!props.post.author.avatar"
          class="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gray-400 font-bold text-white"
        >
          {{ dp(post.author?.fullName) }}
        </span>

        <span v-else>
          <img
            :src="props.post.author.avatar"
            class="w-[40px] h-[40px] object-cover rounded-full"
          />
        </span> -->
      </div>
      <div class="w-[80%] flex flex-col items-center">
        <div class="text-base font-Raleway dark:text-white">
          @{{ props.post?.authorDetails?.username }}
        </div>
        <button
          class="block w-[80%] mt-2 font-semibold bg-base rounded-md py-1 text-white text-center font-QuickSand"
        >
          follow
        </button>
      </div>
    </div>
    <div class="text-gray-700 mt-4">
      <i class="fa-solid fa-star text-yellow-500"></i>
      <span class="ml-1 dark:text-white">
        {{ favourite }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dp } from '@/components/post/utils'
import Avatar from '@/components/Avatar.vue'

const props = defineProps(['post'])

const favourite = computed(() => {
  if (props.post?.authorDetails?.favourite) {
    if (props.post?.authorDetails?.favourite.length > 14) {
      return props.post?.authorDetails?.favourite.slice(0, 14) + '...'
    } else {
      return props.post?.authorDetails?.favourite
    }
  } else return 'unknown'
})
</script>

<style scoped></style>

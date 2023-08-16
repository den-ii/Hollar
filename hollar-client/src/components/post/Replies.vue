<template>
  <div
    v-for="reply in props.results"
    :key="reply.id"
    class="cursor-pointer hover:shadow flex gap-2 w-full mb-2 p-2 border-gray-400 dark:border-gray-200 rounded-lg items-start border"
    @click.prevent="router.push(`/replies/@${reply?.authorDetails?.username}/${reply.id}`)"
    :class="{ borderBright: main }"
  >
    <avatar
      :post="reply"
      :size="`w-[40px] h-[40px]`"
      :src="reply?.authorDetails?.avatar"
      :dpName="reply?.authorDetails?.fullName"
    />
    <!-- <img
      v-if="reply.author?.avatar"
      :src="reply.author?.avatar"
      loading="lazy"
      class="w-[50px] h-[50px] object-cover rounded-full"
    />
    <span
      v-else
      class="w-[55px] h-[50px] rounded-full bg-gray-400 flex items-center justify-center text-white font-bold"
    >
      {{ dp(reply?.author?.fullName) }}
    </span> -->
    <div class="break">
      <div class="text-base text-sm relative">
        <span
          class="prof font-Raleway cursor-pointer dark:text-white dark:font-light"
          @mouseover="enter(reply.id)"
          @mouseleave="leave(reply.id)"
        >
          @{{ reply?.authorDetails?.username }}</span
        >
        <div
          :id="!main ? reply.id : mainHoverId"
          class="view border border-darks dark:border-white p-2 z-50 absolute rounded-lg -top-[102px] shadow dark:bg-darks bg-white"
          @mouseover.prevent="enter(reply.id)"
          @mouseleave="leave(reply.id)"
        >
          <view-profile :post="reply" />
        </div>
      </div>
      <div class="font-light mt-1 mr-1 min-h-[35px]">
        <div class="" v-html="reply?.comment"></div>
      </div>
      <div class="flex justify-end mt-2 gap-5">
        <like-post
          :likesCount="reply?.likesCount"
          :userLiked="reply?.userLiked"
          :id="reply?.id"
          :isReply="true"
        />
        <button class="flex items-center">
          <i class="fa-regular fa-comment"></i>
          <span class="ml-1 five font-Raleway">{{
            reply.replyCount > 0 ? reply.replyCount : ''
          }}</span>
          <!-- <i class="fa-regular fa-comment-dots text-gray-600 text-lg"></i> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LikePost from '@/components/post/LikePost.vue'
import ViewProfile from '@/components/profile/ViewProfile.vue'
import Avatar from '@/components/Avatar.vue'
import { v4 as uuidv4 } from 'uuid'

import { dp } from './utils'
const router = useRouter()

const props = defineProps(['results', 'main'])
const mainHoverId = ref(uuidv4())

function enter(id) {
  const item: any = document.getElementById(id)

  if (props.main) {
    const mainItem: any = document.getElementById(mainHoverId.value)
    if (mainItem) mainItem.style.display = 'block'
  } else if (item) {
    item.style.display = 'block'
  }
}
function leave(id) {
  const item: any = document.getElementById(id)
  if (props.main) {
    const mainItem: any = document.getElementById(mainHoverId.value)
    if (mainItem) mainItem.style.display = 'none'
  } else if (item) {
    item.style.display = 'none'
  }
}
</script>

<style>
.view {
  display: none;
}
.borderBright {
  animation: borderBright 1s infinite linear;
}

@keyframes borderBright {
  0% {
  }

  100% {
    outline: 1px solid whitesmoke;
  }
}
</style>

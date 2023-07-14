<template>
  <div
    v-for="post in props.results"
    :key="post.id"
    class="cursor-pointer hover:shadow flex gap-2 w-full mb-1 border border-dotted p-2 border-gray-400 dark:border-white rounded-lg items-start"
    @click.prevent="router.push(`/post/@${post.author.username}/${post.id}`)"
  >
    <img
      v-if="post.author?.avatar"
      :src="post.author?.avatar"
      loading="lazy"
      class="w-[50px] h-[50px] object-cover rounded-full"
    />
    <span
      v-else
      class="w-[55px] h-[50px] rounded-full dark:bg-gray-400 bg-gray-400 flex justify-center text-white dark:text-darks items-center font-bold"
    >
      {{ dp(post.author.fullName) }}
    </span>
    <div class="w-full">
      <div class="text-base font-semibold text-sm relative">
        <span
          class="prof cursor-pointer italic text-base dark:text-white text-sm"
          @mouseover="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          @{{ post.author.username }}</span
        >
        <div
          :id="post.id"
          class="view w-[150px] min-h-[100px] border absolute rounded-lg -top-[102px] bg-white dark:bg-darks shadow"
          @mouseover.prevent="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          <view-profile :post="post" />
        </div>
      </div>
      <div class="font-light w-full min-h-[100px] flex flex-col justify-between g-5">
        <div>{{ post.comment }}</div>
        <div class="flex justify-end gap-5">
          <like-post :likes="post?.likes" :post="post" />
          <button>
            <span class="mr-1">{{ post.replies.length ? post.replies.length : '' }}</span>
            <i class="fa-regular fa-comment"></i>
            <!-- <i class="fa-regular fa-comment-dots text-gray-600 text-lg"></i> -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LikePost from '@/components/post/LikePost.vue'
import ViewProfile from '@/components/profile/ViewProfile.vue'
import { dp } from './utils'
const router = useRouter()
const auth = useAuthStore()
const props = defineProps(['results'])

function enter(id) {
  console.log(props.results)
  const item: any = document.getElementById(id)
  if (item) {
    item.style.display = 'block'
  }
}
function leave(id) {
  const item: any = document.getElementById(id)
  if (item) {
    item.style.display = 'none'
  }
}
</script>

<template>
  <div
    v-for="post in props.results"
    :key="post.id"
    class="cursor-pointer hover:shadow flex gap-2 w-full mb-1 border p-2 border-gray-400 dark:border-gray-100 dark:hover:shadow-barshadow rounded-lg items-start"
    @click.prevent="router.push(`/post/@${post?.authorDetails.username}/${post?.id}`)"
  >
    <avatar
      :post="post"
      :dpName="post?.authorDetails.fullName"
      :src="post?.authorDetails.avatar"
      size="w-[40px] h-[40px]"
    />
    <div class="break">
      <div class="text-base font-semibold text-sm relative">
        <span
          class="prof font-Raleway cursor-pointer text-base dark:text-white text-sm"
          @mouseover="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          @{{ post.authorDetails.username }}</span
        >
        <div
          :id="post.id"
          class="view border border-darks dark:border-white absolute rounded-lg -top-[102px] bg-white dark:bg-darks p-2 shadow"
          @mouseover.prevent="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          <view-profile :post="post" />
        </div>
      </div>
      <div class="mt-1 mr-1 min-h-[35px]">
        <div v-html="post.comment" class=""></div>
      </div>
      <div class="flex justify-end mt-2 gap-5">
        <like-post :likesCount="post?.likesCount" :id="post.id" :userLiked="post.userLiked" />
        <button class="flex items-center">
          <i class="fa-regular fa-comment"></i>
          <span class="ml-1 font-Raleway five">{{
            post?.replyCount > 0 ? post.replyCount : ''
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Avatar from '@/components/Avatar.vue'
import LikePost from '@/components/post/LikePost.vue'
import ViewProfile from '@/components/profile/ViewProfile.vue'
const router = useRouter()
const props = defineProps(['results'])

function enter(id) {
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

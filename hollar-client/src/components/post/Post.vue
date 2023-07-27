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
      size="w-[56px] h-[50px]"
    />
    <div class="w-full">
      <div class="text-base font-semibold text-sm relative">
        <span
          class="prof cursor-pointer text-base dark:text-white text-sm"
          @mouseover="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          @{{ post.authorDetails.username }}</span
        >
        <div
          :id="post.id"
          class="view w-[150px] min-h-[100px] border absolute rounded-lg -top-[102px] bg-white dark:bg-darks p-2 shadow"
          @mouseover.prevent="enter(post.id)"
          @mouseleave="leave(post.id)"
        >
          <view-profile :post="post" />
        </div>
      </div>
      <div class="font-light w-full min-h-[100px] flex flex-col justify-between g-5">
        <div>{{ post.comment }}</div>
        <div class="flex justify-end gap-5">
          <like-post :likesCount="post?.likesCount" :id="post.id" :userLiked="post.userLiked" />
          <button>
            <span class="mr-1">{{ post?.replyCount > 0 ? post.replyCount : '' }}</span>
            <i class="fa-regular fa-comment"></i>
          </button>
        </div>
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

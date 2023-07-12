<template>
  <div
    v-for="post in props.results"
    :key="post.id"
    class="cursor-pointer hover:shadow flex gap-2 w-full mb-1 border border-dotted p-2 border-gray-400 rounded-lg items-start"
    @click.prevent="router.push(`/post/@${post.author.username}/${post.id}`)"
  >
    <img
      v-if="post.author?.avatar"
      :src="post.author?.avatar"
      class="w-[50px] h-[50px] rounded-full"
    />
    <div v-else class="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse mr-2"></div>
    <div class="w-full">
      <div class="text-base font-semibold text-sm relative">
        <span class="prof cursor-pointer" @mouseover="enter(post.id)" @mouseleave="leave(post.id)">
          @{{ post.author.username }}</span
        >
        <div
          :id="post.id"
          class="view w-[150px] min-h-[100px] border absolute rounded-lg p-2 -top-[102px] bg-white shadow"
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

<template>
  <div
    v-for="reply in props.results"
    :key="reply.id"
    class="cursor-pointer hover:shadow flex gap-2 w-full mb-1 border border-dotted p-2 border-gray-400 rounded-lg items-start"
    @click.prevent="router.push(`/replies/@${reply.author.username}/${reply.id}`)"
  >
    <img
      v-if="reply.author?.avatar"
      :src="reply.author?.avatar"
      class="w-[50px] h-[50px] rounded-full"
    />
    <div v-else class="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse mr-2"></div>
    <div class="w-full">
      <div class="text-base font-semibold text-sm relative">
        <span
          class="prof cursor-pointer"
          @mouseover="enter(reply.id)"
          @mouseleave="leave(reply.id)"
        >
          @{{ reply.author.username }}</span
        >
        <div
          :id="reply.id"
          class="view w-[150px] min-h-[90px] border absolute rounded-lg p-2 -top-[102px] bg-white shadow"
          @mouseover.prevent="enter(reply.id)"
          @mouseleave="leave(reply.id)"
        >
          <view-profile :post="reply" />
        </div>
      </div>
      <div class="font-light w-full min-h-[90px] flex flex-col justify-between g-5">
        <div>{{ reply.comment }}</div>
        <div class="flex justify-end gap-5">
          <like-post :likes="reply?.likes" :post="reply" :isReply="true" />
          <button>
            <span class="mr-1">{{ reply.replies.length ? reply.replies.length : '' }}</span>
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
  console.log(id)
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

<style>
.view {
  display: none;
}
</style>

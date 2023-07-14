<template>
  <div class="border rounded-lg mb-1" v-for="reply in newReplies" :key="reply.id">
    <div class="flex gap-2 min-h-[100px] mb-1 hover:shadow">
      <!-- avatar -->
      <img
        v-if="auth.user?.avatar"
        :src="auth.user?.avatar"
        loading="lazy"
        class="w-[50px] h-[50px] object-cover rounded-full mt-2 ml-2"
      />
      <span
        v-else
        class="w-[55px] h-[50px] rounded-full bg-gray-400 text-white font-bold items-center justify-center"
        >{{ auth.name }}</span
      >
      <!-- username -->
      <div class="w-full flex justify-between gap-1">
        <div class="w-full mr-3">
          <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
            <span
              class="prof cursor-pointer font-semibold dark:text-white"
              @mouseover="enter(reply.id)"
              @mouseleave="leave(reply.id)"
            >
              @{{ auth.user.username }}</span
            >
            <div
              :id="reply.id"
              class="view w-[150px] min-h-[100px] border p-2 absolute rounded-lg -top-[102px] bg-white dark:bg-darks shadow z-50"
              @mouseover="enter(reply.id)"
              @mouseleave="leave(reply.id)"
            >
              <view-profile :post="dummyPost" />
            </div>
          </div>
          <div class="font-light w-full h-[70%] flex flex-col justify-between g-5">
            <div class="pl-2">{{ reply.reply }}</div>
            <div class="flex justify-end gap-5">
              <like-post :likes="reply.likes" :post="reply" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const props = defineProps(['newReplies'])
const dummyPost = {
  author: {
    username: auth.user?.username,
    avatar: auth.user?.avatar
  }
}
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

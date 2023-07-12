<template>
  <div class="border rounded-lg mb-1" v-for="(reply, index) in newReplies" :key="index">
    <div class="flex gap-2 min-h-[100px] mb-1 hover:shadow">
      <!-- avatar -->
      <img
        v-if="auth.user?.avatar"
        :src="auth.user?.avatar"
        class="w-[50px] h-[50px] rounded-full mt-2 ml-2"
      />
      <div v-else class="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse mr-2"></div>
      <!-- username -->
      <div class="w-full flex justify-between gap-1">
        <div class="w-full mr-3">
          <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
            <span
              class="prof cursor-pointer font-semibold"
              @mouseover="enter(`reply${new Date()}`)"
              @mouseleave="leave(`reply${new Date()}`)"
            >
              @{{ auth.user.username }}</span
            >
            <div
              :id="`reply${new Date()}`"
              class="view w-[150px] min-h-[100px] border absolute rounded-lg p-2 -top-[102px] bg-white shadow z-50"
              @mouseover="enter(`reply${new Date()}`)"
              @mouseleave="leave(`reply${new Date()}`)"
            >
              <view-profile :post="dummyPost" />
            </div>
          </div>
          <div class="font-light w-full h-[70%] flex flex-col justify-between g-5">
            <div class="pl-2">{{ reply }}</div>
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

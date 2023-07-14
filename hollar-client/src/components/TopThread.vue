<template>
  <div>
    <div class="box border border-gray-800 dark:border-white border-dashed rounded-lg" v-if="post">
      <div class="flex gap-2 min-h-[150px]">
        <!-- avatar -->
        <img
          v-if="post?.author?.avatar"
          :src="post?.author?.avatar"
          loading="lazy"
          class="w-[50px] h-[50px] rounded-full mt-2 ml-2 object-cover"
        />
        <span
          v-else
          class="w-[55px] mt-2 ml-2 h-[50px] rounded-full flex items-center justify-center bg-gray-400 font-bold text-white"
        >
          {{ dp(post.author?.fullName) }}
        </span>
        <!-- username -->
        <div class="w-full flex justify-between gap-1">
          <div class="w-full mr-3">
            <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
              <span
                class="prof cursor-pointer font-semibold dark:text-white italic"
                @mouseover="enter(post.id)"
                @mouseleave="leave(post.id)"
              >
                @{{ post?.author.username }}</span
              >
              <div
                :id="post.id"
                class="view w-[150px] min-h-[100px] border absolute rounded-lg p-2 -top-[102px] bg-white dark:bg-darks shadow z-50"
                @mouseover.prevent="enter(post.id)"
                @mouseleave="leave(post.id)"
              >
                <view-profile :post="post" />
              </div>
            </div>
            <div class="font-light w-full h-[80%] flex flex-col justify-between g-5">
              <div class="pl-2">{{ post.comment }}</div>
              <div class="flex justify-end gap-5">
                <like-post :likes="post.likes" :post="post" />
                <button>
                  <span class="mr-1">{{ post?.replies?.length ? post?.replies?.length : '' }}</span>
                  <i class="fa-regular fa-comment dark:text-white"></i>
                  <!-- <i class="fa-regular fa-comment-dots text-gray-600 text-lg"></i> -->
                </button>
              </div>
            </div>
          </div>
          <span v-if="post?.room?.cover">
            <img
              :src="post?.room.cover"
              class="w-[80px] rounded-tr-xl opacity-80 cursor-pointer px-1 py-1 rounded-br-xl h-full object-cover"
            />
          </span>
          <span v-else>
            <img
              :src="post?.post.room?.cover"
              class="w-[80px] rounded-tr-xl opacity-80 cursor-pointer px-1 py-1 rounded-br-xl h-full object-cover"
            />
          </span>
          <!-- {{ postResult }} -->
        </div>
      </div>
    </div>
    <!-- {{ topReplies }} -->
    <!-- <div
      class="box border border-gray-800 dark:border-white border-dashed rounded-lg"
      v-else
      v-for="reply in topReplies"
      :key="reply.id"
    ></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dp } from '@/components/post/utils'
import ViewProfile from './profile/ViewProfile.vue'
import LikePost from './post/LikePost.vue'
const props = defineProps(['post', 'topReplies'])

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
// const element = ref(document.getElementById('replySection'))
// console.log(element, 'el')
// element.value?.scrollIntoView(true)
</script>

<style scoped></style>

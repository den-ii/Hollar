<template>
  <div>
    <div v-if="post" class="box border border-gray-800 dark:border-white rounded-lg">
      <div class="flex gap-2 min-h-[150px]">
        <avatar
          :post="post"
          :dpName="post?.authorDetails?.fullName"
          :src="post?.authorDetails?.avatar"
          size="w-[50px] h-[50px] mt-2 ml-2"
        />

        <div class="w-full flex justify-between gap-1">
          <div class="w-full mr-3">
            <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
              <span
                class="prof cursor-pointer dark:text-gray-200"
                @mouseover="enter(post?.id)"
                @mouseleave="leave(post?.id)"
              >
                @{{ post?.authorDetails.username }}</span
              >
              <div
                :id="post?.id"
                class="view w-[150px] min-h-[100px] border absolute rounded-lg p-2 -top-[102px] bg-white dark:bg-darks shadow z-50"
                @mouseover.prevent="enter(post?.id)"
                @mouseleave="leave(post?.id)"
              >
                <view-profile :post="post" />
              </div>
            </div>
            <div class="font-light w-full h-[80%] flex flex-col justify-between g-5">
              <div class="pl-2 dark:text-gray-200 text-darks">{{ post?.comment }}</div>
              <div class="flex justify-end gap-5">
                <like-post
                  :likesCount="post?.likesCount"
                  :userLiked="post?.userLiked"
                  :id="post?.id"
                />
                <button>
                  <span class="mr-1">{{ post?.replyCount > 0 ? post?.replyCount : '' }}</span>
                  <i class="fa-regular fa-comment dark:text-white"></i>
                </button>
              </div>
            </div>
          </div>
          <span>
            <img
              :src="post?.roomDetails.cover"
              class="w-[80px] rounded-tr-xl opacity-80 cursor-pointer px-1 py-1 rounded-br-xl h-full object-cover"
            />
            <div></div>
          </span>
          <!-- <span v-else>
            <img
              :src="post?.post.room?.cover"
              class="w-[80px] rounded-tr-xl opacity-80 cursor-pointer px-1 py-1 rounded-br-xl h-full object-cover"
            />
          </span> -->
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
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '@/stores/auth'
import ViewProfile from './profile/ViewProfile.vue'
import LikePost from './post/LikePost.vue'
import Avatar from '@/components/Avatar.vue'
const props = defineProps(['post', 'topReplies'])

const auth = useAuthStore()
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
const roomHoverId = uuidv4()
// const element = ref(document.getElementById('replySection'))
// console.log(element, 'el')
// element.value?.scrollIntoView(true)
</script>

<style scoped></style>

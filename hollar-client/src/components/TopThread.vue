<template>
  <div>
    <div
      v-if="post"
      id=""
      class="border border-neutral-700 dark:border-white rounded-lg cursor-pointer flex gap-2 min-h-[180px]"
      :class="{ borderBright: main }"
      @click.prevent="router.push(`/post/@${post?.authorDetails?.username}/${post?.id}`)"
    >
      <avatar
        :post="post"
        :dpName="post?.authorDetails?.fullName"
        dpSize="w-[48px] h-[45px]"
        class="mt-2 ml-2"
        :src="post?.authorDetails?.avatar"
        size="w-[45px] h-[45px]"
      />
      <div class="breaktopthread flex flex-col">
        <div class="text-base font-semibold pt-2 text-sm relative">
          <span
            class="prof cursor-pointer text-base text-sm dark:text-gray-200 font-light font-Raleway"
            @mouseover="enter(post?.id)"
            @mouseleave="leave(post?.id)"
          >
            @{{ post?.authorDetails.username }}</span
          >
          <div
            :id="post?.id"
            class="view border border-darks dark:border-white absolute rounded-lg py-2 -top-[2px] bg-white dark:bg-darks shadow z-50"
            @mouseover.prevent="enter(post?.id)"
            @mouseleave="leave(post?.id)"
          >
            <ViewProfile :post="post" />
          </div>
        </div>
        <div class="flex flex-col h-full justify-between">
          <div class="dark:text-gray-200 text-neutral-600" v-html="post?.comment"></div>
          <div class="flex justify-end gap-5 mb-2">
            <like-post :likesCount="post?.likesCount" :userLiked="post?.userLiked" :id="post?.id" />
            <button class="flex items-center">
              <i class="fa-regular fa-comment dark:text-white"></i>
              <span class="ml-1 font-Raleway font-semibold">{{
                post?.replyCount > 0 ? post?.replyCount : ''
              }}</span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="post?.roomDetails" class="item-end py-1">
        <div
          class="w-[120px] h-full rounded-tr-lg py-1 px-1 cursor-pointer rounded-br-lg rounded-bl rounded-tl shadow-barshadow"
        >
          <top-thread-img-skeleton>
            <img
              :src="post?.roomDetails.cover"
              class="w-[120px] rounded-tr-lg opacity-90 cursor-pointer rounded-br-lg h-full object-cover rounded-bl rounded-tl"
            />
          </top-thread-img-skeleton>
        </div>
      </div>
      <!-- <div class="w-full flex gap-2 min-h-[140px]">
        <avatar
          :post="post"
          :dpName="post?.authorDetails?.fullName"
          dpSize="w-[49px] h-[45px] mt-2 ml-2"
          :src="post?.authorDetails?.avatar"
          size="w-[45px] h-[45px] mt-2 ml-2"
        />

        <div class="w-full flex justify-between gap-1">
          <div class="mr-2">
            <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
              <span
                class="prof cursor-pointer dark:text-gray-200 dark:font-light font-Raleway"
                @mouseover="enter(post?.id)"
                @mouseleave="leave(post?.id)"
              >
                @{{ post?.authorDetails.username }}</span
              >
              <div
                :id="post?.id"
                class="view border border-darks dark:border-white absolute rounded-lg p-2 -top-[102px] bg-white dark:bg-darks shadow z-50"
                @mouseover.prevent="enter(post?.id)"
                @mouseleave="leave(post?.id)"
              >
                <view-profile :post="post" />
              </div>
            </div>
            <div class="font-light h-[58%]">
              
            </div>
            <div class="flex justify-end gap-5">
              <like-post
                :likesCount="post?.likesCount"
                :userLiked="post?.userLiked"
                :id="post?.id"
              />
              <button class="flex items-center">
                <i class="fa-regular fa-comment dark:text-white"></i>
                <span class="ml-1 font-Raleway">{{
                  post?.replyCount > 0 ? post?.replyCount : ''
                }}</span>
              </button>
            </div>
          </div>
        </div>
        
      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import TopThreadImgSkeleton from '@/components/skeleton/TopThreadImgSkeleton.vue'
import ViewProfile from './profile/ViewProfile.vue'
import LikePost from './post/LikePost.vue'
import Avatar from '@/components/Avatar.vue'
const props = defineProps(['post', 'topReplies', 'main'])

const router = useRouter()

// const auth = useAuthStore()
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

<style scoped></style>

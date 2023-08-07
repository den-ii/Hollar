<template>
  <div><replies :results="newReplies" /></div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import ViewProfile from '../profile/ViewProfile.vue'
import Replies from './Replies.vue'
import { useRouter } from 'vue-router'
import Avatar from '../Avatar.vue'
import LikePost from './LikePost.vue'
const auth = useAuthStore()
const props = defineProps(['newReplies'])

const router = useRouter()
const dummyPost = {
  authorDetails: {
    username: auth.user?.username,
    avatar: auth.user?.avatar,
    fullName: auth.user?.fullName,
    favourite: auth.user?.favourite
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

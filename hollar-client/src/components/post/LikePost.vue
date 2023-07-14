<template>
  <span>
    <button v-if="!liked" class="flex items-center gap-1" @click.stop="like">
      <span class="font-Raleway text text-gray-800 dark:text-white">{{ len }}</span
      ><span class="w-[12px]"><i class="fa-regular fa-heart"></i></span>
    </button>
    <button v-else class="flex items-center gap-1" @click.stop="unlike">
      <span class="font-Raleway text text-gray-800 dark:text-white">{{ len }}</span
      ><span class="w-[12px]"><i class="fa-solid text-red-400 fa-heart"></i></span>
    </button>
  </span>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, ref, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { likePost, unlikePost, likeReply, unlikeReply } from '@/graphql/mutations'

const props = defineProps(['likes', 'post', 'isReply'])

const auth = useAuthStore()
const liked = ref(props.likes?.find((x: string) => (x == auth.user?.id ? true : false)))
const likeLen = ref(props.likes ? props.likes.length : 0)

const { mutate: likeMutate, error: likeError, onDone: likeDone } = useMutation(likePost)
const { mutate: unlikeMutate, error: unlikeError, onDone: unlikeDone } = useMutation(unlikePost)
const {
  mutate: likeReplyMutate,
  error: likeReplyError,
  onDone: likeReplyDone
} = useMutation(likeReply)
const {
  mutate: unlikeReplyMutate,
  error: unlikeReplyError,
  onDone: unlikeReplyDone
} = useMutation(unlikeReply)

const len = computed(() => (likeLen.value > 0 ? likeLen.value : ''))

function like() {
  if (!liked.value) {
    liked.value = !liked.value
    likeLen.value++
    if (props.isReply) {
      console.log('replylike', props.post.id)
      likeReplyMutate({ replyId: props.post.id, userId: auth.user.id })
    } else {
      console.log(props.isReply)
      likeMutate({ postId: props.post.id, userId: auth.user.id })
    }
    console.log(likeReplyError)
  }
}
function unlike() {
  if (liked.value) {
    liked.value = !liked.value
    likeLen.value--
    if (props.isReply) {
      unlikeReplyMutate({ replyId: props.post.id, userId: auth.user.id })
    } else {
      unlikeMutate({ postId: props.post.id, userId: auth.user.id })
    }
  }
}
</script>

<style>
.heart:hover {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    font-size: 1rem;
  }
  50% {
    font-size: 1.2rem;
  }
}
</style>

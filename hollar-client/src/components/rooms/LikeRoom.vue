<template>
  <div>
    <div class="flex gap-3">
      <!-- likes -->
      <div class="flex items-center gap-1 cursor-pointer w-[40px]">
        <!-- <span>24</span><i class="fa-regular fa-thumbs-up"></i> -->
        <div
          class="flex items-center gap-1 hover:text-lg h-[18px]"
          v-if="liked && auth?.user"
          @click.stop="like"
        >
          <span class="font-Raleway">{{ likeLen }}</span>
          <i class="fa-solid fa-thumbs-up text-green-500"></i>
        </div>
        <div class="flex items-center gap-1 hover:text-lg h-[18px]" v-else @click.stop="like">
          <span class="font-Raleway">{{ likeLen }}</span>
          <i class="fa-regular fa-thumbs-up text-gray-800 dark:text-gray-100"></i>
        </div>
      </div>
      <!-- dislikes -->
      <div
        class="flex items-center gap-1 hover:text-lg w-[40px] h-[18px]"
        v-if="disliked && auth?.user"
        @click.stop="dislike"
      >
        <span class="font-Raleway">{{ dislikeLen }}</span>
        <i class="fa-solid fa-thumbs-down text-red-500"></i>
      </div>
      <div
        class="flex items-center gap-1 hover:text-lg w-[40px] h-[18px]"
        v-else
        @click.stop="dislike"
      >
        <span class="font-Raleway">{{ dislikeLen }}</span>
        <i class="fa-regular fa-thumbs-down text-gray-800 dark:text-gray-100"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, ref, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { likeRoom, dislikeRoom } from '@/graphql/mutations'

const props = defineProps(['likesCount', 'dislikesCount', 'roomId', 'userLiked', 'userDisliked'])

const { mutate: likeMutate, error: likeError, onDone: likeDone } = useMutation(likeRoom)
const { mutate: dislikeMutate, error: dislikeError, onDone: dislikeDone } = useMutation(dislikeRoom)

const auth = useAuthStore()
const liked = ref(props.userLiked === 1 ? true : false)
const disliked = ref(props.userDisliked === 1 ? true : false)
const dislikeLen = ref(props.dislikesCount)
const likeLen = ref(props.likesCount)
console.log('userLiked', props.userLiked)
console.log('userdisLiked', props.userDisliked)

function like() {
  if (!auth.isAuth) {
    auth.authModal = true
    return
  } else if (!liked.value) {
    liked.value = !liked.value
    likeLen.value++
    likeMutate({ roomId: props.roomId, userId: auth.user?.id })
    console.log(likeError)
    if (disliked.value) {
      disliked.value = !disliked.value
      dislikeLen.value--
    }
  }
}
function dislike() {
  if (!auth.isAuth) {
    auth.authModal = true
    return
  } else if (!disliked.value) {
    disliked.value = !disliked.value
    dislikeLen.value++
    dislikeMutate({ roomId: props.roomId, userId: auth.user?.id })
    if (liked.value) {
      liked.value = !liked.value
      likeLen.value--
    }
  }
}
watch(likeError, () => console.log('le', likeError))
</script>

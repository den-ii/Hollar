<template>
  <main class="max-w-[750px] mt-[100px] mx-auto min-h-[screen] pb-3">
    <!-- Room Header -->
    <div
      class="shadow dark:shadow-barshadow dark:border dark:border-black rounded-lg px-3 py-3 relative"
    >
      <div class="">
        <bg-skeleton>
          <div class="h-[200px]">
            <img
              ref="coverImg"
              v-if="result?.room.cover"
              :src="result?.room?.cover"
              loading="lazy"
              class="w-full h-[200px] object-cover rounded-tl-lg rounded-tr-lg"
              @error="imageError"
            />
          </div>
        </bg-skeleton>
      </div>
      <h1 class="five text-darks dark:text-gray-200 text-xl mt-3">
        {{ result?.room?.name }}
      </h1>
      <span
        class="dark:bg-darks rounded-full text-base dark:border dark:border-black absolute p-0 -right-5 -bottom-5"
        ><i class="fa-solid fa-circle-play text-6xl"></i
      ></span>
    </div>

    <!-- Room Posts -->
    <div class="mt-16 mb-3">
      <!-- {{ postResults?.roomPosts }} -->
      <post :results="postResults?.roomPosts" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { imageError } from '@/components/skeleton/utils'
import Post from '@/components/post/Post.vue'
import { useQuery } from '@vue/apollo-composable'
import { roomQuery, roomPosts } from '@/graphql/queries'
import { useAuthStore } from '@/stores/auth'
import BgSkeleton from '@/components/rooms/BgSkeleton.vue'

const route = useRoute()
const id = route.params.id
const auth = useAuthStore()
const coverImg: any = ref(null)

const vars = auth?.user?.id
  ? {
      id: id,
      cursor: '',
      limit: 2,
      userId: auth?.user?.id
    }
  : {
      id: id,
      cursor: '',
      limit: 2
    }

const { result, error } = useQuery(roomQuery, { id }, { fetchPolicy: 'cache-and-network' })

const {
  result: postResults,
  loading,
  fetchMore,
  error: roomPostsError
} = useQuery(roomPosts, () => vars, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network'
})
watch(roomPostsError, () => {
  console.log(roomPostsError)
})
console.log(postResults)

// loadMore()
// load rooms function
function loadMore() {
  fetchMore({
    variables: {
      cursor: postResults?.value?.roomPosts?.slice(-1)[0].createdAt
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      // No new feed posts
      if (!fetchMoreResult) return previousResult

      // Concat previous feed with new feed posts

      return {
        ...previousResult,
        roomPosts: [...previousResult.roomPosts, ...fetchMoreResult.roomPosts]
      }
    }
  })
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
.w {
  width: calc(100% - 50px);
}
.view {
  display: none;
}
.base {
  color: #8250df;
}
</style>

<template>
  <main class="max-w-[750px] mx-auto min-h-[screen] pb-3">
    <!-- Room Header -->
    <div class="shadow dark:shadow-dshadow rounded-lg px-3 py-3">
      <div class="">
        <div class="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" v-if="!room?.cover" />
        <img :src="room?.cover" class="w-full h-[300px] object-cover rounded-lg" v-else />
      </div>
      <h1 class="font-bold text-2xl mt-3">{{ room?.name.toUpperCase() }}</h1>
    </div>

    <!-- Room Posts -->
    <div class="mt-16 mb-3">
      <post :results="postResults?.roomPosts.posts" />
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Post from '@/components/post/Post.vue'
import { useQuery } from '@vue/apollo-composable'
import { roomQuery, roomPosts } from '@/graphql/queries'

const route = useRoute()
const id = route.params.id

const room = computed(() => (result.value?.room ? result.value?.room : null))
const { result, error } = useQuery(roomQuery, { id }, { fetchPolicy: 'cache-and-network' })
const {
  result: postResults,
  loading,
  fetchMore,
  error: roomPostsError
} = useQuery(
  roomPosts,
  () => ({
    id: id,
    cursor: '',
    limit: 2
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)
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
console.log(room)
console.log(id)
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
</style>

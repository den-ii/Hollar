<template>
  <main class="max-w-[750px] mx-auto min-h-[screen]">
    <!-- Room Header -->
    <div class="shadow rounded-lg px-3 py-3">
      <div class="">
        <div class="w-full h-[300px] bg-base rounded-lg" v-if="!room?.cover" />
        <img :src="room?.cover" class="w-full h-[300px] object-cover rounded-lg" v-else />
      </div>
      <h1 class="font-bold text-2xl mt-3">{{ room?.name.toUpperCase() }}</h1>
    </div>

    <!-- Room Posts -->
    <div class="mt-16">
      <div
        v-for="post in postResults?.roomPosts.posts"
        :key="post.id"
        class="flex gap-3 w-full mb-3 items-start justify-center"
      >
        <img
          v-if="post.author?.avatar"
          :src="post.author?.avatar"
          class="w-[50px] h-[50px] rounded-full"
        />
        <span v-else class="w-[50px] bars h-[50px] rounded-full bg-base"></span>
        <div class="w-[80%]">
          <div class="text-base font-Raleway italic font-semibold">@{{ post.author.username }}</div>
          <div
            class="font-Poppins font-light w-full rounded-md p-2 min-h-[100px] shadow flex flex-col justify-between g-5"
          >
            <div>{{ post.comment }}</div>
            <div class="flex justify-end gap-3">
              <button><i class="pi pi-heart"></i></button>

              <button><i class="fa-regular fa-comment-dots text-lg text-gray-500"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { roomQuery, roomPosts } from '@/graphql/queries'
const route = useRoute()
const id = route.params.id

const room = computed(() => (result.value?.room ? result.value?.room : null))
const { result, error } = useQuery(roomQuery, { id })
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
  { notifyOnNetworkStatusChange: true }
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

<style scoped></style>

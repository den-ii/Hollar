<template>
  <div>
    <!-- Room Header -->
    <div
      class="shadow dark:shadow-barshadow dark:border dark:border-black rounded-lg px-3 py-3 relative"
    >
      <div class="">
        <bg-skeleton>
          <div class="h-[200px]">
            <img
              ref="coverImg"
              v-if="result?.room?.cover"
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
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'

import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { imageError } from '@/components/skeleton/utils'
import Post from '@/components/post/Post.vue'
import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { roomQuery, roomPosts } from '@/graphql/queries'
import { useAuthStore } from '@/stores/auth'
import BgSkeleton from '@/components/rooms/BgSkeleton.vue'
import { apolloClient } from '@/Apollo'

import { nextTick } from 'vue'
const route = useRoute()
// const id = route.params.id as string

const props = defineProps(['id'])
const auth = useAuthStore()
const coverImg: any = ref(null)
const renderComponent = ref(true)

const vars = auth?.user?.id
  ? {
      id: props.id,
      cursor: '',
      limit: 5,
      userId: auth?.user?.id
    }
  : {
      id: props.id,
      cursor: '',
      limit: 5
    }

const { result, error, load, refetch } = useLazyQuery(
  roomQuery,
  { id: props.id },
  { fetchPolicy: 'cache-and-network' }
)
load() || refetch()
// same as beforeRouteUpdate option with no access to `this`
// onBeforeRouteUpdate(async (to, from) => {
//   // only fetch the user if the id changed as maybe only the query or the hash changed
//   if (to.params.id !== from.params.id) {
//     const query = provideApolloClient(apolloClient)(() =>
//       useQuery(roomQuery, { id: props.id }, { fetchPolicy: 'cache-and-network' })
//     )
//     console.log(to.params.id, from.params.id, query)
//     refetch()
//   }
// })

const {
  result: postResults,
  loading,
  fetchMore,
  error: roomPostsError
} = useQuery(roomPosts, () => vars, {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: 'cache-and-network'
})
watch([error], () => {
  console.log(error)
  console.log('a', props.id)
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

function infiniteScroll() {
  if (!loading.value) {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 100
    if (bottomOfWindow) {
      loadMore()
    }
  }
}

// infinite scrollin
window.addEventListener('scroll', infiniteScroll)
onUnmounted(() => window.removeEventListener('scroll', infiniteScroll))
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

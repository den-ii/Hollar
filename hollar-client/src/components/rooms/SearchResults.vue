<template>
  <div
    class="mt-6 rounded-md ahadow dark:shadow-dshadow"
    v-for="room in result?.searchRooms"
    :key="room.id"
    @click="$emit('toRoom', room.name, room.id)"
  >
    <img
      class="rounded-tl-lg rounded-tr-lg block"
      :src="room.cover"
      alt="poster"
      loading="lazy"
      v-if="room.cover"
    />
    <div v-else class="rounded-tl-lg rounded-tr-lg h-[100px] bg-gray-200 animate-pulse"></div>
    <!-- src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg" -->
    <div class="flex justify-between p-4 h-[60px]">
      <p class="font-Raleway">0 posts</p>
      <h1 class="font-semibold">{{ room.name.toUpperCase() }}</h1>
      <like-room :likes="room?.likes" :dislikes="room?.dislikes" :roomId="room?.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { searchRoomsQuery } from '@/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import LikeRoom from './LikeRoom.vue'

defineEmits(['toRoom'])
const props = defineProps(['search'])
console.log(props.search)
const { result, loading, fetchMore } = useQuery(
  searchRoomsQuery,
  () => ({
    search: props.search,
    cursor: '',
    limit: 2
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)
function loadMore() {
  fetchMore({
    variables: {
      cursor: result?.value?.searchRooms?.slice(-1)[0].updatedAt
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      // No new feed posts
      if (!fetchMoreResult) return previousResult

      // Concat previous feed with new feed posts

      return {
        ...previousResult,
        searchRooms: [...previousResult.searchRooms, ...fetchMoreResult.searchRooms]
      }
    }
  })
}

function infiniteScroll() {
  console.log(loading)
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
img {
  height: 130px;
  object-fit: cover;
  width: 100%;
}
</style>

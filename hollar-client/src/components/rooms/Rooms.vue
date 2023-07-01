<template>
  <div class="mb-5 cursor-pointer">
    <rooms-header @openRoomModal="$emit('openRoomModal')" :rooms="rooms" @change="change" />
    <div>
      <div
        class="mt-6 rounded-md shadow"
        v-for="room in result?.roomsPaginate"
        :key="room.id"
        @click="toRoom(room.id)"
      >
        <img class="rounded-tl-lg rounded-tr-lg block" :src="room.cover" alt="poster" />
        <!-- <img
          class="rounded-tl-lg rounded-tr-lg block"
          src="https://asianwiki.com/images/2/2f/Taxi_Driver-teaser03S02.jpeg"
          alt="poster"
        /> -->
        <div class="flex justify-between p-4 h-[60px]">
          <p>0 holz</p>
          <h1 class="font-semibold">{{ room.name.toUpperCase() }}</h1>
          <div class="flex gap-3">
            <!-- likes -->
            <div class="flex items-center gap-1 cursor-pointer w-[40px]">
              <!-- <span>24</span><i class="fa-regular fa-thumbs-up"></i> -->
              <div class="flex items-center gap-1 hover:text-lg">
                <span>24</span>
                <i class="fa-solid fa-thumbs-up text-green-500 hover:text-lg"></i>
              </div>
            </div>
            <!-- dislikes -->
            <div class="flex items-center gap-1 hover:text-lg w-[40px]">
              <span>24</span>
              <i class="fa-solid fa-thumbs-down text-red-500 hover:text-lg"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-show="loading">Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import RoomsHeader from './RoomsHeader.vue'
import { roomsPaginateQuery } from '@/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import { infiniteScroll } from './utils'

defineEmits(['openRoomModal'])
defineProps({
  rooms: Boolean
})
const router = useRouter()
const name = ref('taxidriver')
const search = ref('')

function toRoom(id) {
  router.push(`rooms/${id}`)
}
function like() {}

function unlike() {}

const { result, loading, fetchMore } = useQuery(roomsPaginateQuery, () => ({
  cursor: '',
  limit: 1
}))

// load rooms function
function loadMore() {
  fetchMore({
    variables: {
      cursor: result?.value?.roomsPaginate?.slice(-1)[0].createdAt
    }
  })
}
// load room on initial render
loadMore()

// infinite scrollin
window.addEventListener('scroll', () => infiniteScroll(loadMore))
onUnmounted(() => window.removeEventListener('scroll', () => infiniteScroll(loadMore)))

// search function
function change(value) {
  search.value = value
  console.log(value)
}
watch(result, () => {
  console.log(result.value.roomsPaginate.slice(-1)[0].createdAt)
})
</script>

<style scoped>
img {
  height: 130px;
  object-fit: cover;
  width: 100%;
}
</style>

<template>
  <div>
    <div
      class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-50 flex flex-col items-center justify-center"
    >
      <div
        class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 opacity-30"
        @click.prevent="closePostModal"
      ></div>

      <div class="bg-white h-[70vh] w-[80%] max-h-[500px] max-w-[800px] rounded-2xl z-40 relative">
        <span
          class="bg-base absolute z-50 w-[30px] h-[30px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer z-index-50"
          aria-label="close modal"
          @click.prevent="closePostModal"
          ><i class="fa-solid fa-xmark text-white"></i
        ></span>

        <!-- Movie Searchbar -->
        <div class="h-full overflow-y-scroll px-6" id="smovie" v-show="modal == 'chooseMovie'">
          <form @submit.prevent="bringUpMovies">
            <input
              placeholder="SEARCH..."
              v-model="title"
              class="block search w-[100%] text-lg py-3 px-4 mt-3 rounded-full border-2 border-gray-100"
            />
          </form>
          <!-- Movie List -->
          <div class="mt-6">
            <div v-if="data?.length && !loading">
              <div
                v-for="movies in data"
                :key="movies.id"
                class="cursor-pointer hover:bg-purple-50"
                @click="chooseFilm(movies)"
              >
                <!--  -->
                <div class="flex items-center mb-3 p-3 rounded justify-between">
                  <img :src="movies.image?.url" class="moviebg" />
                  <p class="font-bold text-center text-2xl font-Raleway">{{ movies.title }}</p>
                  <p class="font-bold">{{ movies.year }}</p>
                </div>
              </div>
            </div>

            <div
              v-else-if="loading"
              class="flex flex-column h-[35vh] w-full items-center justify-center"
            >
              <i class="fa-solid fa-rotate loader text-6xl"></i>
            </div>
            <div
              v-else-if="error?.name && !loading"
              class="flex flex-column h-[35vh] w-full items-center justify-center text-xl"
            >
              OOPS...NOTHING MATCHES
            </div>
            <div
              v-else-if="!title.length"
              class="flex flex-column h-[35vh] w-full items-center justify-center text-xl"
            >
              SEARCH FOR SOMETHING...
            </div>
            <div
              v-else
              class="flex flex-column h-[35vh] w-full items-center justify-center text-xl"
            >
              SEARCH FOR SOMETHING...
            </div>
          </div>
        </div>

        <!-- Write Post -->
        <div v-show="modal == 'writePost'" class="p-5 h-full">
          <h1 class="text-2xl font-bold">Post</h1>
          <span class="bg-purple-100 px-2 py-1 rounded-xl italic font-Raleway">@juicio7</span>
          <textarea class="rounded-xl focus:outline-none w-full h-[70%]" value="What ya posting...">
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchTvTitlesQuery } from '@/graphql/queries'
import { createRoomMutate } from '@/graphql/mutations'
import { useAuthStore } from '@/stores/auth'
import { useModalStore } from '@/stores/modals'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

defineEmits(['closePostModal'])

const auth = useAuthStore()
const modals = useModalStore()
const router = useRouter()
const title = ref('')
const data: any = ref(null)
const modal = ref('chooseMovie')
const chosenFilm = ref(null)

let { result, load, refetch, loading, error, onError } = useLazyQuery(searchTvTitlesQuery, {
  title: title
})
let {
  mutate,
  loading: createRoomLoading,
  error: createRoomError,
  onDone
} = useMutation(createRoomMutate)

async function bringUpMovies() {
  load() || refetch()
  console.log('error', error)
}
console.log(title.value)
console.log('error', error)

async function createRoom(movie) {
  movie.creator = auth.user.id
  console.log(auth.user.id)
  console.log(movie)
  movie.description = ''
  const { id } = movie
  const { height, url, id: tvid, width } = movie.image
  movie.tv = { id }
  movie.tv.image = { height, url, width, tvid }

  mutate({ ...movie })
  modal.value = 'createRoom'
}

function closePostModal() {
  modal.value = 'chooseMovie'
  modals.postModal = false
}
// choose film
function chooseFilm(movie) {
  chosenFilm.value = movie
  modal.value = 'writePost'
}
onError((err) => {
  error.value = err
})
watch([result, createRoomError], () => {
  data.value = result.value ? result.value?.searchTvTitles : []
  onDone((result) => {
    console.log(result.data)
    router.push(`/rooms/${result.data.createRoom.id}`)
  })
})
</script>

<style></style>

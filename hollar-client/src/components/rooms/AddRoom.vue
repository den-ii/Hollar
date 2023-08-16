<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-40 flex flex-col items-center justify-center"
  >
    <div
      class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 dark:bg-transparent dark:backdrop-blur-lg opacity-30"
      @click.prevent="$emit('closeRoomModal')"
    ></div>

    <div
      class="bg-white dark:bg-darks dark:border dark:border-black h-[70vh] w-[80%] max-h-[500px] max-w-[800px] rounded-2xl z-40 relative"
    >
      <span
        class="bg-base absolute z-50 w-[30px] h-[30px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer z-index-50"
        aria-label="close modal"
        @click.prevent="$emit('closeRoomModal')"
        ><i class="fa-solid fa-xmark text-white dark:text-gray-100"></i
      ></span>

      <!-- Movie Searchbar -->
      <div class="h-full overflow-y-scroll relative px-6" id="smovie" v-if="modal == 'addRoom'">
        <form @submit.prevent="bringUpMovies" class="sticky top-3">
          <input
            placeholder=""
            v-model="title"
            ref="search"
            class="block five search addsearch dark:bg-black dark:text-gray-200 w-[100%] text-lg py-3 px-4 mt-3 rounded-full border-2 border-gray-100"
          />
        </form>
        <!-- Movie List -->
        <div class="mt-6">
          <div v-if="data?.length && !loading">
            <div v-for="movies in data" :key="movies.id">
              <!--  -->
              <div class="flex items-center mb-3 justify-between">
                <img :src="movies.image?.url" class="moviebg" loading="lazy" />
                <div class="w-full text-center">
                  <p class="font-semibold text-2xl">{{ movies.title }}</p>
                  <button
                    v-if="movies.inRoom"
                    class="mt-2 bg-yellow-600 text-white rounded px-2 py-1 font-semibold cursor-not-allowed"
                  >
                    already created
                  </button>
                  <button
                    v-else
                    class="mt-2 bg-base text-white rounded px-2 py-1 font-semibold"
                    @click.prevent="
                      createRoom({ name: movies.title, cover: movies.image?.url, tv: movies })
                    "
                  >
                    available to create
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="loading"
            class="flex flex-column h-[35vh] w-full items-center justify-center"
          >
            <i class="fa-solid fa-rotate text-base loader"></i>
          </div>
          <div
            v-else-if="error?.name && !loading"
            class="flex flex-column h-[35vh] dark:text-gray-200 w-full items-center justify-center text-xl"
          >
            OOPS...NOTHING MATCHES
          </div>
          <div
            v-else-if="!title.length"
            class="flex dark:text-gray-200 flex-column h-[35vh] w-full items-center justify-center text-xl"
          >
            CREATE A CHANNEL
          </div>
          <div
            v-else
            class="flex dark:text-gray-200 flex-column h-[35vh] w-full items-center justify-center text-xl"
          >
            CREATE A CHANNEL

            <!-- SEARCH FOR TV SHOWS & MOVIES... -->
          </div>
        </div>
      </div>
      <!-- Create room loader -->
      <div v-else class="flex flex-column h-full justify-center items-center">
        <div v-if="createRoomLoading">
          <i class="fa-solid fa-rotate loader text-3xl"></i>
        </div>
        <div v-else-if="!createRoomLoading">ROOM CREATED</div>
        <div v-else>AN ERROR OCCURRED</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchTvTitlesQuery } from '@/graphql/queries'
import { createRoomMutate } from '@/graphql/mutations'
import { useAuthStore } from '@/stores/auth'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'

defineEmits(['openRoomModal'])

const auth = useAuthStore()
const router = useRouter()
const title = ref('')
const search: any = ref(null)
const data: any = ref(null)
const modal = ref('addRoom')

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
}
console.error('error', error)

async function createRoom(movie) {
  movie.creator = auth.user.id
  movie.description = ''
  const { id, year } = movie.tv
  const { height, imageUrl, width } = movie.tv.image
  movie.tv = { id, year }
  movie.tv.image = { height, imageUrl, width }

  mutate({ ...movie })
  modal.value = 'createRoom'
  onDone((result) => {
    let { name, id } = result.data.createRoom
    name = name.split(' ').join('+')
    router.push(`/${name}/${id}`)
  })
}
onError((err) => {
  error.value = err
})
watch(search, () => {
  search.value?.focus()
})
watch([result, createRoomError], () => {
  data.value = result.value ? result.value?.searchTvTitles : []
})
</script>

<style></style>

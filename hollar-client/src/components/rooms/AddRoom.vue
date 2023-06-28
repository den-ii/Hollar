<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-40 flex flex-col items-center justify-center"
  >
    <div
      class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 opacity-30"
      @click.prevent="$emit('closeRoomModal')"
    ></div>

    <div class="bg-white h-[70vh] w-[80%] max-h-[500px] max-w-[800px] rounded-2xl z-40 relative">
      <span
        class="bg-base absolute z-50 w-[30px] h-[30px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer z-index-50"
        aria-label="close modal"
        @click.prevent="$emit('closeRoomModal')"
        ><i class="fa-solid fa-xmark text-white"></i
      ></span>

      <!-- MOVIE SEARCHBAR -->
      <div class="h-full overflow-y-scroll px-6" id="smovie">
        <form @submit.prevent="bringUpMovies">
          <input
            placeholder="SEARCH..."
            v-model="title"
            class="block search w-[100%] text-lg py-3 px-4 mt-3 rounded-full border-2 border-gray-100"
          />
        </form>
        <!-- MOVIE LIST -->
        <div class="mt-6">
          <div v-if="data?.length && !loading">
            <div v-for="movies in data" :key="movies.imddbID">
              <div class="flex items-center mb-3 justify-between">
                <img :src="movies.Poster" />
                <div class="w-full text-center">
                  <p class="font-bold text-2xl font-Raleway">{{ movies.Title }}</p>
                  <button
                    v-if="movies.inRoom"
                    class="mt-2 bg-yellow-600 text-white font-Raleway rounded px-2 py-1 font-bold cursor-not-allowed"
                  >
                    already created
                  </button>
                  <button
                    v-else
                    class="mt-2 bgz2 text-white font-Raleway rounded px-2 py-1 font-bold"
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
          <div v-else class="flex flex-column h-[35vh] w-full items-center justify-center text-xl">
            SEARCH FOR SOMETHING...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchTvTitlesQuery } from '@/graphql/queries'
import { useLazyQuery } from '@vue/apollo-composable'

defineEmits(['openRoomModal'])

const title = ref('')
const data: any = ref(null)

let { result, load, refetch, loading, error, onError } = useLazyQuery(searchTvTitlesQuery, {
  title: title
})

async function bringUpMovies() {
  load() || refetch()
  console.log('error', error)
}
console.log(title.value)
console.log('error', error)

onError((err) => {
  error.value = err
})
watch([result, title], () => {
  data.value = result.value ? result.value?.searchTvTitles : []
  // console.log(title.value)
  // console.log(data.value)
})
</script>

<style scoped>
img {
  height: 240px;
  width: 160px;
  border-radius: 6px;
}
#smovie::-webkit-scrollbar {
  width: 10px;
  cursor: pointer;
}

/* Track */
#smovie::-webkit-scrollbar-track {
  border-radius: 10px;
  cursor: pointer;
}

/* Handle */
#smovie::-webkit-scrollbar-thumb {
  /*background: rgba(88, 30, 235, 0.3);*/
  background: gainsboro;
  border-radius: 10px;
  cursor: pointer;
}

/* Handle on hover */
#smovie::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.loader {
  animation: rotation 1s infinite linear;
  color: rgba(88, 30, 235, 0.7);
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>

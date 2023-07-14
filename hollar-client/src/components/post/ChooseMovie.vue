<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-50 flex flex-col items-center justify-center"
  >
    <div
      class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 dark:bg-transparent dark:backdrop-blur opacity-30"
      @click="$emit('closeAllModal')"
    ></div>

    <div
      class="bg-white dark:bg-darks h-[70vh] w-[80%] max-h-[500px] max-w-[800px] rounded-2xl z-40 relative dark:shadow-barshadow"
    >
      <span
        class="bg-base absolute z-50 w-[30px] h-[30px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer z-index-50"
        aria-label="close modal"
        @click.prevent="$emit('closeAllModal')"
        ><i class="fa-solid fa-xmark text-white"></i
      ></span>

      <!-- Movie Searchbar -->
      <div class="h-full overflow-y-scroll px-6" id="smovie">
        <form @submit.prevent="bringUpMovies(search)">
          <input
            placeholder="SEARCH..."
            v-model="search"
            class="block dark:text-darks search w-[100%] text-lg py-3 px-4 mt-3 rounded-full border-2 border-gray-100"
          />
        </form>
        <!-- Movie List -->
        <div class="mt-6">
          <div v-if="data?.length && !loading">
            <div
              v-for="movies in data"
              :key="movies.id"
              class="cursor-pointer hover:bg-purple-50 dark:hover:bg-transparent dark:hover:shadow-barshadow"
              @click="$emit('chooseFilm', movies)"
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
            <i class="fa-solid fa-rotate loader text-base"></i>
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
import { ref } from 'vue'
defineEmits(['closeAllModal', 'closeAllModal', 'change'])
defineProps<{
  bringUpMovies: (value: string) => {}
  modal: string
  loading: boolean
  error: any
  data: [any] | null
  title: string
}>()

const search = ref('')
</script>

<style></style>

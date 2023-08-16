<template>
  <div v-if="modals.postModal">
    <choose-movie
      :loading="loading"
      :bring-up-movies="bringUpMovies"
      :modal="modal"
      :error="error"
      :data="data"
      :title="title"
      @chooseFilm="chooseFilm"
      @close-all-modal="modals.postModal = false"
      v-show="!chosenFilm"
    />
    <write-post
      :chosen-film="chosenFilm"
      @unchoose="unchoose"
      @close-all-modal="modals.postModal = false"
      v-show="chosenFilm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { searchTvTitlesQuery } from '@/graphql/queries'
import { createRoomMutate } from '@/graphql/mutations'
import { useAuthStore } from '@/stores/auth'
import ChooseMovie from './ChooseMovie.vue'
import WritePost from './WritePost.vue'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modals'

defineEmits(['closePostModal'])

const auth = useAuthStore()
const modals = useModalStore()
const router = useRouter()
const title = ref('')
const data: any = ref(null)
const modal = ref('choose')
const chosenFilm: any = ref(null)

let { result, load, refetch, loading, error, onError } = useLazyQuery(searchTvTitlesQuery, {
  title: title
})

function chooseFilm(movie) {
  chosenFilm.value = movie
  modal.value = 'post'
}

function unchoose() {
  chosenFilm.value = null
  modal.value = 'choose'
}

async function bringUpMovies(value) {
  title.value = value
  load() || refetch()
  console.error('error', error)
}

onError((err) => {
  error.value = err
})
watch(result, () => {
  data.value = result.value ? result.value?.searchTvTitles : []
})
</script>

<style scoped></style>

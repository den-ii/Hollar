<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { roomQuery } from '@/graphql/queries'
const route = useRoute()
const id = route.params.id

const room = computed(() => (result.value?.room ? result.value?.room : null))
const { result, error } = useQuery(roomQuery, { id })
console.log(room)
console.log(id)
</script>

<template>
  <main class="max-w-[750px] mx-auto min-h-[screen]">
    <!-- Room Header -->
    <div class="shadow rounded-lg px-3 py-3">
      <div class="">
        <img :src="room?.cover" class="w-full h-[300px] object-cover rounded-lg" />
      </div>
      <h1 class="font-bold text-2xl mt-3">{{ room?.name.toUpperCase() }}</h1>
    </div>

    <!-- Room Posts -->
    <div class="mt-3"></div>
  </main>
</template>
<style scoped></style>

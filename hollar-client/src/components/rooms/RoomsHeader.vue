<template>
  <div class="mt-6 flex items-center justify-between">
    <input
      class="block border-2 shadow p-2 rounded-lg dark:bg-darks"
      :class="{ 'w-full': rooms, 'w-[80%]': !rooms }"
      type="text"
      name="search"
      id=""
      placeholder="Search"
      v-model="value"
      @keyup="$emit('change', value)"
    />
    <div v-show="!rooms">
      <button
        class="ml-2 bg-green-700 rounded-full w-[35px] h-[35px]"
        @click.prevent="$emit('openRoomModal')"
      >
        <i class="fa-solid fa-plus text-white"></i>
      </button>
      <button class="ml-2">
        <i class="fa-solid fa-phone-volume text-base text-lg"></i>
      </button>
      <button>
        <i class="fa-regular fa-ellipsis-stroke text-base"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineEmits(['openRoomModal', 'change'])
// const props = defineProps<{
//   rooms?: boolean
// }>()
defineProps({
  rooms: Boolean
})

const value = ref('')
</script>

<style scoped></style>

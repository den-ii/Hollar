<template>
  <div class="mt-6 flex items-center justify-between">
    <div v-show="!rooms" class="ml-auto flex gap-2 items-center">
      <button>
        <i class="fa-brands fa-hive text-lg text-gray-200"></i>
      </button>
      <button class="" v-if="auth.isAuth">
        <i class="fa-solid fa-phone-volume text-gray-200 text-lg"></i>
      </button>
      <button
        v-if="auth.isAuth"
        class="bg-gray-200 rounded-full w-[30px] h-[30px]"
        @click.prevent="$emit('openRoomModal')"
      >
        <i class="fa-solid fa-plus text-darks"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
defineEmits(['openRoomModal', 'change'])

defineProps({
  rooms: Boolean
})

// const value = ref('')
const auth = useAuthStore()
// const searchBar = ref(false)
// const searchEle: any = ref(null)

// function rollupSearch() {
//   searchBar.value = !searchBar.value
//   if (searchBar.value === true) {
//     setTimeout(() => {
//       if (searchBar.value) return searchEle.value?.focus()
//     }, 700)
//   }
// }
// function closeupSearch() {
//   // alert('lazy')
//   searchBar.value = false
// }
// watch(searchEle, () => {
//   console.log(searchEle)
// })
</script>

<style scoped>
.searchbar {
  /*animation: rollup 1s linear;*/
  width: 80%;
}
.v-enter-active,
.v-leave-active {
  transition: width 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  width: 0;
}
</style>

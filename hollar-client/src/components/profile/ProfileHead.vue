<template>
  <div>
    <!-- Background Profile -->
    <div class="relative">
      <div class="bg-purple-50 h-[200px] w-full rounded"></div>
      <span
        v-if="edit"
        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-base absolute -right-3 -bottom-3"
        ><i class="fa-solid fa-plus text-xl text-white"></i
      ></span>
    </div>

    <!-- Display Picture -->
    <div class="relative">
      <div v-if="auth.user?.avatar?.length" class="cursor-pointer absolute -top-15">
        <img :src="auth.user?.avatar" />
      </div>
      <div
        v-else
        :class="`w-[105px] h-[105px] flex items-center justify-center cursor-pointer rounded-full ${auth.authBg} absolute -top-12`"
      >
        <p class="text-4xl font-bold text-white">{{ dp }}</p>
        <span
          v-if="edit"
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-base absolute -right-0 bottom-0"
          ><i class="fa-solid fa-plus text-xl text-white"></i
        ></span>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="mt-24 font-Raleway font-bold text-lg flex justify-between">
      <!-- Profile Info -->
      <div>
        <p>Deni Ochiche</p>
        <p>@deni7</p>
        <div>
          <i class="fa-solid fa-star text-yellow-500"></i
          ><span class="italic font-light">White Chicks</span>
        </div>
      </div>
      <!-- Profile Settings -->
      <div class="flex items-center gap-3">
        <button @click="logOut"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        <button class="w-[30px] rounded-full shadow"><i class="fa-solid fa-gear"></i></button>
        <button
          class="flex max-h-[30px] items-center gap-2 border border-grey-500 shadow rounded-md px-2 cursor-pointer text-gray-900"
          @click="edit = !edit"
        >
          <span>{{ edit ? 'Save' : 'Edit' }}</span>
          <i v-if="!edit" class="fa-solid fa-pen-to-square text-gray-900"></i>
          <i v-else class="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// vars
const auth = useAuthStore()
const dp = auth.name()
const edit = ref(false)
const router = useRouter()

// methods
function logOut() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped></style>

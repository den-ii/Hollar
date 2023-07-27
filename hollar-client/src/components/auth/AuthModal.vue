<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-50 flex flex-col items-center justify-center"
  >
    <div
      class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 opacity-30 dark:bg-transparent dark:backdrop-blur-lg"
      @click.prevent="auth.authModal = false"
    ></div>
    <div
      class="bg-white h-[70vh] w-[80%] max-h-[500px] max-w-[800px] rounded-xl flex z-50 relative"
    >
      <span
        class="bg-base absolute z-50 w-[30px] h-[30px] rounded-full flex items-center justify-center -left-3 -top-3 cursor-pointer"
        aria-label="close modal"
        @click.prevent="auth.authModal = false"
        ><i class="fa-solid fa-xmark text-white"></i
      ></span>
      <div class="w-[50%] rounded-lg px-1 py-1">
        <img
          src="/bestauth.jpg"
          loading="lazy"
          class="rounded-tl-lg rounded-bl-lg h-full w-full"
          alt=""
        />
      </div>
      <div class="w-[50%] bg-purple-50 rounded-lg">
        <login v-show="authType === 'Login'" @auth-kind="authType = 'Register'" />
        <register v-show="authType === 'Register'" @auth-kind="authType = 'Login'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Login from './LogIn.vue'
import Register from './Register.vue'

const auth = useAuthStore()
const authType = ref('Login')
</script>

<style scoped></style>

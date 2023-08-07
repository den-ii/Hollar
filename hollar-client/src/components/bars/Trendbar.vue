<template>
  <div
    class="shadow trend fixed top-[60px] right-0 w-[200px] px-4 flex flex-col justify-between dark:shadow-barshadow dark:bg-darks"
  >
    <div>
      <h1
        class="bg-base text-white dark:text-gray-100 rounded-lg text-center mb-2 text-[1rem] font-bold mt-3 py-1 dark:font-semibold cursor-pointer"
      >
        What's Trending?
      </h1>
      <ul class="text-[1.1rem]">
        <li
          v-for="trend in Trends"
          :key="trend"
          class="dark:text-gray-200 dark:hover:text-purple-50 cursor-pointer"
        >
          {{ trend }}
        </li>
      </ul>
    </div>
    <footer class="text-sm dark:text-gray-200 mb-3">
      <button v-if="auth.isAuth" class="hover:text-red-600" @click="logOut">
        Logout
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <p><a>Terms of Service</a></p>
      <p><a>Privacy Policy</a></p>
      <p>&copy; 2023 ALX</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Trends from '@/assets/trends'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const auth = useAuthStore()
function logOut() {
  auth.logout()
  router.push('/')
}
</script>

<style></style>

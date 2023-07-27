<template>
  <header
    class="shadow fixed h-[60px] top-0 left-0 right-0 w-full flex items-center bg-white dark:bg-darks dark:shadow-barshadow z-40"
  >
    <nav class="w-screen flex items-center justify-between px-3">
      <!-- LOGO -->
      <div>
        <h1 class="font-bold text-xl text-base font-QuickSand dark:text-white">HOLLAR&#8482;</h1>
      </div>

      <!-- <div class="flex gap-5 text-lg">
        <p class="font-Poppins text-gray-700">Top Rooms</p>
        <p class="font-Poppins text-gray-700">MyWatchlist</p>
      </div> -->
      <!-- UNSIGNED LIST -->
      <div class="" v-if="!auth.isAuth">
        <!-- <input
          type="text"
          class="w-[200px] mr-3 font-QuickSand font-light font-sm dark:bg-hdark dark:placeholder:text-gray-200 py-1 border border-base placeholder:text-darks dark:border-0 rounded-lg px-2"
          placeholder="search"
        /> -->
        <button
          class="bg-base text-white rounded-lg py-2 px-3 font-semibold"
          @click.prevent="auth.authModal = true"
        >
          Log in?
        </button>
      </div>
      <div class="flex items-center gap-5" v-else>
        <input
          type="text"
          placeholder="search here ... username starts with @"
          class="w-[290px] focus:bg-white search py-1 px-2 text-sm placeholder:text-darks dark:placeholder:text-gray-400 rounded-lg font-Quicksand text-darks dark:text-gray-100 bg-slate-100 dark:border-gray-200 dark:bg-black"
        />
        <!-- <button>
          <i class="fa-solid fa-magnifying-glass -mr-2 text-gray-100"></i>
        </button> -->
        <button class="relative cursor-pointer">
          <i class="fa-regular fa-bell text-xl text-gray-600 dark:text-gray-100"></i
          ><span
            class="absolute -top-2 left-3 bg-base text-white w-5 h-5 rounded-full flex items-center justify-center text-sm"
            >3</span
          >
        </button>
        <button v-if="auth.user?.avatar?.length" @click="router.push('/profile')">
          <img
            :src="auth.user?.avatar"
            loading="lazy"
            :class="`w-[45px] h-[45px] flex items-center justify-center cursor-pointer rounded-full ${auth.authBg} object-cover`"
            onerror=""
          />
        </button>
        <button
          v-else
          :class="`w-[45px] h-[45px] flex items-center justify-center cursor-pointer rounded-full ${auth.authBg}`"
          @click="router.push('/profile')"
        >
          <p class="text-lg font-bold text-white">{{ auth.name }}</p>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const dp = auth.name
const router = useRouter()
</script>
<style scoped>
.search {
  background-image: url(../../assets/search.svg);
  background-repeat: no-repeat;
  background-position: 8px 50%;
  text-indent: 20px;
}
</style>

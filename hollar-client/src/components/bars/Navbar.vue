<template>
  <header
    class="shadow fixed h-[60px] top-0 left-0 right-0 w-full flex items-center bg-white dark:bg-darks dark:shadow-barshadow z-40"
  >
    <nav class="w-screen flex items-center justify-between px-3">
      <!-- LOGO -->
      <div>
        <h1 class="font-bold flex items-center gap-1 text-lg text-base dark:text-gray-200">
          <i class="fa-solid fa-circle-play text-3xl"></i>
          <span class="font-semibold text-lg font-QuickSand">HOLLAR</span>
        </h1>
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
          placeholder="search here ... channel search with #"
          class="w-[300px] focus:bg-white search py-1 px-2 text-sm placeholder:text-darks focus:placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg text-darks dark:text-gray-100 bg-slate-100 dark:border-gray-200 dark:bg-black"
        />
        <!-- <button>
          <i class="fa-solid fa-magnifying-glass -mr-2 text-gray-100"></i>
        </button> -->
        <button class="relative cursor-pointer">
          <i class="fa-regular fa-bell text-lg text-gray-600 dark:text-gray-100"></i
          ><span
            class="absolute -top-2 left-[10.5px] bg-base text-white dark:text-gray-100 w-5 h-5 rounded-full font-semibold font-QuickSand flex items-center justify-center text-xs"
            >3</span
          >
        </button>
        <button v-if="auth.user" @click="router.push('/profile/@me')">
          <avatar :dpName="auth.user?.fullName" :src="auth.user?.avatar" size="w-[40px] h-[40px]" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Avatar from '../Avatar.vue'

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

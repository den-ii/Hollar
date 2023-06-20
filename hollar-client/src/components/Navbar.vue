<template>
  <header class="bars fixed h-[60px] top-0 left-0 right-0 w-full flex items-center bg-white z-40">
    <nav class="w-screen flex items-center justify-between px-3">
      <!-- LOGO -->
      <div>
        <h1 class="font-bold text-xl text-base font-QuickSand">HOLLAR&#8482;</h1>
      </div>

      <!-- <div class="flex gap-5 text-lg">
        <p class="font-Poppins text-gray-700">Top Rooms</p>
        <p class="font-Poppins text-gray-700">MyWatchlist</p>
      </div> -->
      <!-- UNSIGNED LIST -->
      <div class="" v-if="!auth.isAuth">
        <button
          class="bg-base text-white rounded-lg py-2 px-4 font-semibold"
          @click.prevent="auth.authModal = true"
        >
          Log in?
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
</script>
<style>
.bars {
  box-shadow: rgba(88, 30, 235, 0.2) 0px 1px 3px 0px;
}
</style>

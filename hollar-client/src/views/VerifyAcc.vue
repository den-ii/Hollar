<template>
  <div class="flex flex-col justify-center h-[100vh] items-center -mt-[100px]">
    <div
      v-if="!error"
      class="font-QuickSand flex flex-col justify-center items-center h-full max-h-[400px] w-[80%] max-w-[400px] bars rounded-lg gap-5"
    >
      <div><i class="fa-solid fa-circle-check text-green-500 text-6xl mb-6"></i></div>
      <p class="text-lg font-bold">YOU'VE BEEN VERIFIED</p>
      <router-link to="/" class="">
        <button class="bg-base font-Raleway font-bold rounded-lg text-lg text-white py-2 px-4">
          GO TO HOLLAR
        </button>
      </router-link>
    </div>
    <div
      v-else
      class="font-QuickSand flex flex-col justify-center items-center h-full max-h-[400px] w-[80%] max-w-[400px] bars rounded-lg gap-5"
    >
      <div><i class="fa-solid fa-circle-xmark text-red-500 text-6xl mb-6"></i></div>
      <p class="text-lg font-bold">INVALID VERIFICATION</p>
      <p class="-mt-3">You should try again later</p>
      <router-link to="/" class="">
        <button class="bg-base font-Raleway font-bold rounded-lg text-lg text-white py-2 px-4">
          GO TO HOLLAR
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { verifyUser, verifyUserError } from '@/graphql/mutations'
import { ref, watch, computed } from 'vue'

const { token } = useRoute().query
const me = verifyUser({ token })
const error = verifyUserError
</script>

<style scoped></style>

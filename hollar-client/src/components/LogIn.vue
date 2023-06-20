<template>
  <div class="p-2 h-full flex flex-col justify-between relative">
    <div>
      <h2 class="text-base font-bold">HOLLAR&#8482;</h2>
    </div>
    <div class="" v-if="!signInWithMail">
      <button
        class="mb-4 mx-auto rounded bg-white shadow py-2 w-[200px] font-Raleway flex items-center gap-2 px-2 justify-center login"
      >
        <img src="google.svg" alt="google sign in" class="w-[20px] h-[20px]" />
        <span class="font-Raleway">Log in with Google</span>
      </button>
      <button
        class="mb-3 mx-auto rounded bg-white shadow py-2 w-[200px] flex items-center justify-center gap-3 login"
        @click.prevent="signInWithMail = true"
      >
        <img src="Minduka-mail.svg" alt="email sign in" class="w-[20px] h-[20px]" />

        <!-- <span class="text-base text-[20px]"><i class="fa-regular fa-envelope"></i></span> -->
        <span class="font-Raleway">Log in with Email</span>
      </button>
    </div>
    <div class="" v-else>
      <form class="flex flex-col gap-3">
        <div class="w-[80%] mx-auto">
          <label for="email" class="font-Raleway">Email/Username:</label>
          <input
            type="text"
            name="email"
            id=""
            class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
          />
        </div>
        <div class="w-[80%] mx-auto">
          <label for="password" class="font-Raleway">Password:</label>
          <input
            type="password"
            name="password"
            id=""
            class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
          />
        </div>
        <button
          class="loginemail mt-2 font-Raleway py-1 px-2 bg-green-700 self-center rounded-lg text-white font-semibold shadow-sm"
        >
          Log in
        </button>
      </form>
      <span
        class="absolute top-[50%] -translate-y-[50%]"
        aria-label="go back"
        @click.prevent="signInWithMail = false"
      >
        <i class="icon pi pi-angle-double-left cursor-pointer text-base"></i>
      </span>
    </div>
    <p
      class="font-Raleway font-semibold cursor-pointer hover:underline"
      @click.prevent="$emit('auth-kind')"
    >
      Register?
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'primeicons/primeicons.css'
defineEmits(['auth-kind'])

const signInWithMail = ref(false)
</script>

<style scoped>
.login:hover {
  box-shadow: rgba(88, 30, 235, 0.2) 1px 2px 5px 1px;
}

.loginemail:hover {
  box-shadow: rgba(88, 30, 235, 0.2) 0px 1px 3px 0px;
}
</style>

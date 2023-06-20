<template>
  <div id="register" class="p-2 h-full flex flex-col justify-between relative overflow-y-scroll">
    <div>
      <h2 class="text-base font-bold">HOLLAR&#8482;</h2>
    </div>
    <div class="" v-if="!signUpWithMail">
      <button
        class="mb-4 mx-auto rounded bg-white shadow py-2 w-[200px] font-Raleway flex items-center gap-2 px-2 justify-center login"
      >
        <img src="google.svg" alt="google sign in" class="w-[20px] h-[20px]" />
        <span class="font-Raleway">Register with Google</span>
      </button>
      <button
        class="mb-3 mx-auto rounded bg-white shadow py-2 w-[200px] flex items-center justify-center gap-3 login"
        @click.prevent="signUpWithMail = true"
      >
        <img src="Minduka-mail.svg" alt="email sign in" class="w-[20px] h-[20px]" />

        <!-- <span class="text-base text-[20px]"><i class="fa-regular fa-envelope"></i></span> -->
        <span class="font-Raleway">Register with Email</span>
      </button>
    </div>
    <div class="mt-6" v-else>
      <form class="flex flex-col gap-3">
        <div class="w-[80%] mx-auto">
          <label for="username" class="font-Raleway">Username:</label>
          <input
            type="text"
            name="username"
            id=""
            class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
          />
        </div>
        <div class="w-[80%] mx-auto">
          <label for="email" class="font-Raleway">Email:</label>
          <input
            type="text"
            name="email"
            id=""
            class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
          />
        </div>

        <div class="w-[80%] mx-auto">
          <label for="country" class="font-Raleway">Country:</label>
          <input
            type="text"
            name="country"
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
        <div class="w-[80%] mx-auto">
          <label for="cpassword" class="font-Raleway">Confirm Password:</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
          />
        </div>
        <div class="w-[80%] mt-3 flex flex-row-reverse gap-2 items-center">
          <label for="t&c" class="font-Raleway text-sm"
            >Agree to <a class="font-Raleway underline">terms and conditions</a></label
          >
          <input
            type="checkbox"
            name="t&c"
            id="t&c"
            class="font-Raleway border block w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500"
          />
        </div>
        <button
          class="loginemail mt-2 font-Raleway py-1 px-2 bg-green-700 self-center rounded-lg text-white font-semibold shadow-sm"
          @click.prevent="$emit('auth-kind')"
        >
          Register
        </button>
      </form>
      <span
        class="absolute top-[50%] -translate-y-[50%]"
        aria-label="go back"
        @click.prevent="signUpWithMail = false"
      >
        <i class="icon pi pi-angle-double-left cursor-pointer text-base"></i>
      </span>
    </div>
    <p
      class="font-Raleway font-semibold cursor-pointer hover:underline"
      @click.prevent="$emit('auth-kind')"
    >
      Login?
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'primeicons/primeicons.css'
defineEmits(['auth-kind'])

const signUpWithMail = ref(false)
</script>

<style scoped>
#register::-webkit-scrollbar {
  width: 10px;
  cursor: pointer;
}

/* Track */
#register::-webkit-scrollbar-track {
  border-radius: 10px;
  cursor: pointer;
}

/* Handle */
#register::-webkit-scrollbar-thumb {
  background: rgba(88, 30, 235, 0.3);
  border-radius: 10px;
  cursor: pointer;
}

/* Handle on hover */
#register::-webkit-scrollbar-thumb:hover {
  background: rgba(88, 30, 235, 0.4);
}

.login:hover {
  box-shadow: rgba(88, 30, 235, 0.2) 1px 2px 5px 1px;
}

.loginemail:hover {
  box-shadow: rgba(88, 30, 235, 0.2) 0px 1px 3px 0px;
}
</style>

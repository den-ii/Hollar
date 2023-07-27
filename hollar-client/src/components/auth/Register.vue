<template>
  <div id="register" class="p-2 h-full flex flex-col justify-between relative overflow-y-scroll">
    <div>
      <h2 class="text-base font-bold">HOLLAR&#8482;</h2>
    </div>
    <div v-if="!error && !result">
      <div class="" v-if="!signUpWithMail">
        <button
          class="mb-4 mx-auto rounded bg-white dark:bg-darks shadow py-2 w-[200px] font-Raleway flex items-center gap-2 px-2 justify-center login"
        >
          <img src="google.svg" alt="google sign in" class="w-[20px] h-[20px]" />
          <span class="font-Raleway">Register with Google</span>
        </button>
        <button
          class="mb-3 mx-auto rounded bg-white dark:bg-darks shadow py-2 w-[200px] flex items-center justify-center gap-3 login"
          @click.prevent="signUpWithMail = true"
        >
          <img src="Minduka-mail.svg" alt="email sign in" class="w-[20px] h-[20px]" />

          <!-- <span class="text-base text-[20px]"><i class="fa-regular fa-envelope"></i></span> -->
          <span class="font-Raleway">Register with Email</span>
        </button>
      </div>
      <div class="mt-6" v-else>
        <vee-form class="flex flex-col gap-3" :validation-schema="schema" @submit="register">
          <div class="w-[80%] mx-auto">
            <label for="fullName" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Your Name:</label
            >
            <vee-field
              type="text"
              name="name"
              id="fullName"
              class="font-Raleway border dark:text-darks border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="name" />
          </div>
          <div class="w-[80%] mx-auto">
            <label for="username" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Username:</label
            >
            <vee-field
              type="text"
              name="username"
              id="username"
              class="font-Raleway border dark:text-darks border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="username" />
          </div>
          <div class="w-[80%] mx-auto">
            <label for="email" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Email:</label
            >
            <vee-field
              type="text"
              name="email"
              id="email"
              class="font-Raleway border border-gray-700 block w-full rounded p-1 focus:outline dark:text-darks focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="email" />
          </div>
          <div class="w-[80%] mx-auto">
            <label for="Age" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Age:</label
            >
            <vee-field
              type="number"
              name="age"
              id="age"
              class="font-Raleway dark:text-darks border border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="age" />
          </div>

          <div class="w-[80%] mx-auto">
            <label for="country" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Country:</label
            >

            <country-select
              class="font-Raleway border border-gray-700 block w-full rounded py-2 focus:outline focus:outline-base dark:text-darks"
              v-model="code"
              :country="code"
              topCountry="US"
              :usei18n="false"
              removePlaceholder
            />
            <!-- <region-select v-model="region" :country="country" :region="region" /> -->
            <!-- <vee-field
            type="text"
            name="countrys"
            :countrys="countrys"
            id="countrys"
            class="hidden font-Raleway border border-gray-700 w-full rounded p-1 focus:outline focus:outline-base"
          />
          <ErrorMessage class="text-red-500 font-Raleway text-sm" name="countrys" /> -->
          </div>
          <div class="w-[80%] mx-auto">
            <label for="password" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Password:</label
            >
            <vee-field
              type="password"
              name="password"
              id="password"
              class="font-Raleway border dark:text-darks border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="password" />
          </div>
          <div class="w-[80%] mx-auto">
            <label for="cpassword" class="font-Raleway dark:text-darks"
              ><span class="text-red-500">*</span>Confirm Password:</label
            >
            <vee-field
              type="password"
              name="cpassword"
              id="cpassword"
              class="font-Raleway border dark:text-darks border-gray-700 block w-full rounded p-1 focus:outline focus:outline-base"
            />
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="cpassword" />
          </div>
          <div class="w-[80%] mt-3 flex flex-row-reverse gap-2 items-center">
            <label for="tc" class="font-Raleway text-sm dark:text-darks"
              >Agree to <a class="font-Raleway underline text-sm">terms and conditions</a></label
            >
            <vee-field
              type="checkbox"
              name="tc"
              id="tc"
              value="1"
              class="font-Raleway border block w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500"
            />
          </div>
          <div class="text-center -mt-3">
            <ErrorMessage class="text-red-500 font-Raleway text-sm" name="tc" />
          </div>

          <button
            class="loginemail mt-2 font-Raleway py-1 px-2 bg-green-700 self-center rounded-lg text-white font-semibold shadow-sm"
            :class="{ 'cursor-not-allowed': loading }"
            :disabled="loading"
          >
            Register
          </button>
        </vee-form>
        <span
          class="absolute top-[50%] -translate-y-[50%]"
          aria-label="go back"
          @click.prevent="signUpWithMail = false"
        >
          <i class="icon pi pi-angle-double-left cursor-pointer text-base"></i>
        </span>
      </div>
    </div>
    <div v-else-if="!error && result" class="text-center dark:text-darks">
      Please check your mail for verification link
    </div>
    <div v-else class="text-center dark:text-darks">There was an error while registering</div>

    <span
      class="font-Raleway font-semibold cursor-pointer hover:underline self-start dark:text-darks"
      @click.prevent="$emit('auth-kind')"
    >
      Login?
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { registerQuery } from '@/graphql/queries'
import { useLazyQuery } from '@vue/apollo-composable'

import 'primeicons/primeicons.css'
defineEmits(['auth-kind'])

const schema = reactive({
  name: 'required|min:3|max:35|alphaSpaces',
  username: 'required|min:3|max:25|usernameAval',
  email: 'required|min:3|max:100|email',
  age: 'required|minVal:18|maxVal:140',
  password: 'required|minLength:7',
  cpassword: 'passwords_mismatch:@password',
  tc: 'tos'
})
const signUpWithMail = ref(false)
const code: any = ref('')
const country = ref('')
const regOutput = ref(false)
const user: any = ref({})
const { result, load, loading, error, refetch } = useLazyQuery(
  registerQuery,
  { user },
  { fetchPolicy: 'no-cache' }
)

function register(values) {
  const { name: fullName, email, password, username } = values
  user.value = { fullName, country, email, password, username }
  user.value.color = 'red'
  user.value.country = country
  user.value.countrycode = code
  load() || refetch()
}

watch([code, error, regOutput], () => {
  console.log('err', error)
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const region: any = regionNames.of(code.value)
  country.value = region
})
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

<template>
  <div>
    <!-- Background Profile -->

    <div class="relative">
      <div v-if="bg" class="h-[200px] w-full rounded">
        <img :src="bg" class="w-full h-full rounded object-cover" />
      </div>
      <div v-else-if="auth.user.bg" class="rounded">
        <img :src="auth.user.bg" class="w-full h-[200px] rounded object-cover" />
      </div>
      <div v-else class="bg-purple-50 h-[200px] w-full rounded"></div>

      <button
        v-if="edit"
        class="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-base absolute -right-3 -bottom-3 cursor-pointer"
      >
        <span
          v-if="!loading"
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer backdrop-blur-lg"
          ><i class="fa-solid fa-plus text-xl text-white"></i>
          <input
            ref="bgInput"
            type="file"
            accept=".gif,.jpg,.jpeg,.png"
            class="opacity-0 w-[50px] h-[50px] absolute cursor-pointer"
            @change="parseBg"
        /></span>
        <span
          v-else
          class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white"
          >..</span
        >
      </button>
    </div>

    <!-- Display Picture -->
    <div class="relative">
      <div class="w-[105px] h-[105px] cursor-pointer rounded-full absolute -top-12">
        <div v-if="avatar">
          <img :src="avatar" class="w-[105px] h-[105px] rounded-full object-cover" />
        </div>
        <div v-else-if="!auth.user" class="bg-gray-400 animate-pulse"></div>
        <div v-else-if="auth.user?.avatar?.length">
          <img :src="auth.user?.avatar" class="w-[105px] h-[105px] object-cover rounded-full" />
        </div>
        <div
          v-else
          :class="`${auth.authBg} w-full h-full flex items-center justify-center rounded-full`"
        >
          <p class="text-4xl font-bold text-gray-100">{{ dp }}</p>
        </div>
        <button
          v-if="edit"
          class="cursor-pointer w-[30px] h-[30px] rounded-full bg-base absolute -right-0 bottom-0 backdrop-blur-lg"
        >
          <span
            v-if="!loading"
            class="w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer"
            ><i class="fa-solid fa-plus text-xl text-gray-100 cursor-pointer"></i>
            <input
              ref="avatarInput"
              type="file"
              accept=".gif,.jpg,.jpeg,.png"
              class="opacity-0 w-[30px] h-[30px] absolute cursor-pointer"
              @change="parseAvatar"
            />
          </span>
          <span
            v-else
            class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white"
            >...</span
          >
        </button>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="mt-24 font-Raleway font-bold text-lg flex justify-between">
      <!-- Profile Info -->
      <div>
        <p>{{ auth.user.fullName }}</p>
        <p class="font-Dosis font-semibold italic">@{{ auth.user.username }}</p>
        <div v-if="!edit">
          <i class="fa-solid fa-star text-yellow-500"></i
          ><span class="italic font-light font-Dosis">{{
            auth.user.favourite ? auth.user.favourite : 'unknown'
          }}</span>
        </div>
        <div v-else>
          <i class="fa-solid fa-star text-yellow-500"></i
          ><input
            class="italic font-light font-Dosis border border-base rounded px-1"
            v-model="edited.favourite"
            :placeholder="auth.user.favourite ? auth.user.favourite : 'unknown'"
          />
        </div>
      </div>
      <!-- Profile Settings -->
      <div class="flex items-center gap-3">
        <button @click="logOut">
          <i class="fa-solid fa-arrow-right-from-bracket text-base"></i>
        </button>
        <button class=""><i class="fa-solid fa-gear text-base"></i></button>
        <button
          class="flex items-center gap-2 border border-grey-500 rounded-md px-2 cursor-pointer text-gray-100 bg-base"
          @click.prevent="saveEdit"
        >
          <button v-if="edit">Save</button>
          <button v-else-if="loading" class="text-white">...</button>
          <button v-else>Edit</button>
          <i v-if="!edit" class="fa-solid fa-pen-to-square text-gray-100"></i>
          <i v-else class="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { client, bucket, region } from '@/config/aws'
import { useMutation } from '@vue/apollo-composable'
import { editProfile } from '@/graphql/mutations'

// vars
const auth = useAuthStore()
const dp = auth.name
const loading = ref(false)
const edit = ref(false)
const router = useRouter()
const largeFileContent = ref('')
const isLarge = ref(false)
const avatarInput: any = ref(null)
const avatar: any = ref(null)
const avatarUpload: any = ref('')
const edited: any = reactive({
  userId: auth.user.id,
  avatar: '',
  bg: '',
  favourite: ''
})
const bgInput: any = ref(null)
const bg: any = ref(null)
const bgUpload: any = ref('')

// methods
function logOut() {
  auth.logout()
  router.push('/')
}

function parseAvatar() {
  const file = avatarInput.value?.files[0]
  if (file) {
    console.log(file)
    if (file.size > 236870912) {
      largeFileContent.value = 'You are not allowed to upload files > 212mb'
      isLarge.value = true
      return setTimeout(() => (isLarge.value = false), 2500)
    } else {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        avatar.value = e.target?.result
      }
      avatarUpload.value = file
    }
  }
}
function parseBg() {
  const file = bgInput.value?.files[0]
  if (file) {
    console.log(file)
    if (file.size > 236870912) {
      largeFileContent.value = 'You are not allowed to upload files > 212mb'
      isLarge.value = true
      return setTimeout(() => (isLarge.value = false), 2500)
    } else {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        bg.value = e.target?.result
      }
      bgUpload.value = file
      console.log(bg)
    }
  }
}
async function uploadAvatar() {
  if (avatarUpload.value) {
    console.log('fileupload', region)
    const timestamp = new Date().getTime()
    const filename = timestamp + avatarUpload.value.name.toLowerCase()
    console.log(avatarUpload, 'av')
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: avatarUpload.value
    })
    try {
      const res = await client.send(command)
      edited.avatar = `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
}

async function uploadBg() {
  if (bgUpload.value) {
    console.log('fileupload', region)
    const timestamp = new Date().getTime()
    const filename = timestamp + bgUpload.value.name.toLowerCase()
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: bgUpload.value
    })
    try {
      const res = await client.send(command)
      edited.bg = `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
      console.log(edited.bg, 'edied')
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }
}

//saveEdit
const { mutate, loading: editLoading, onDone, error } = useMutation(editProfile)

async function saveEdit() {
  if (edit.value) {
    loading.value = true

    await uploadAvatar()
    await uploadBg()

    mutate({ profile: edited })
    onDone((result) => {
      console.log('result', result)
      localStorage.setItem('user', JSON.stringify(result.data.editProfile))
      auth.user = result.data.editProfile
      edit.value = false
      loading.value = false
    })

    console.log(error)
  } else {
    edit.value = true
  }
}

// watch(mutate, () => {
//   console.log('result', mutate.v)
// })
</script>

<style scoped></style>

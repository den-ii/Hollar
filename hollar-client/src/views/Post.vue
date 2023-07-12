<template>
  <div class="max-w-[750px] mx-auto min-h-[screen] relative pb-[207px]">
    <!-- Main Post -->
    <div class="box border border-gray-800 border-dashed rounded-lg" v-if="post">
      <div class="flex gap-2 min-h-[150px]">
        <!-- avatar -->
        <img
          v-if="post?.author?.avatar"
          :src="post?.author?.avatar"
          class="w-[50px] h-[50px] rounded-full mt-2 ml-2"
        />
        <div v-else class="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse mr-2"></div>
        <!-- username -->
        <div class="w-full flex justify-between gap-1">
          <div class="w-full mr-3">
            <div class="text-base font-semibold pt-2 pl-2 text-sm relative">
              <span
                class="prof cursor-pointer font-semibold"
                @mouseover="enter(post.id)"
                @mouseleave="leave(post.id)"
              >
                @{{ post?.author.username }}</span
              >
              <div
                :id="post.id"
                class="view w-[150px] min-h-[100px] border absolute rounded-lg p-2 -top-[102px] bg-white shadow z-50"
                @mouseover.prevent="enter(post.id)"
                @mouseleave="leave(post.id)"
              >
                <view-profile :post="post" />
              </div>
            </div>
            <div class="font-light w-full h-[80%] flex flex-col justify-between g-5">
              <div class="pl-2">{{ post.comment }}</div>
              <div class="flex justify-end gap-5">
                <like-post :likes="post.likes" :post="post" />
              </div>
            </div>
          </div>
          <img
            :src="post?.room.cover"
            class="w-[80px] rounded-tr-xl opacity-80 cursor-pointer px-1 py-1 rounded-br-xl h-full object-cover"
          />
          <!-- {{ postResult }} -->
        </div>
      </div>
    </div>
    <div
      v-if="post?.replies.length || !newReplies.length"
      class="w-[1.5px] ml-4 mt-1 mb-1 border-gray-300 border-l border-dashed h-[100px]"
    ></div>

    <!-- newReplies -->
    <user-post :newReplies="newReplies" />

    <post-reply :postId="id" />
    <!-- Reply box -->
    <div class="fixed bottom-2 w-full max-w-[750px] bg-base rounded-xl p-2">
      <div class="flex justify-between pb-2 text-white">
        <h2 class="text-white font-bold font-Raleway text-lg mb-1">Reply:</h2>
        <div class="flex items-center gap-3">
          <p class="font-bold font-Raleway w-12 text-ellipsis text-center">{{ replyLen }}</p>
          <button class="cursor-pointer hover:text-purple-100">
            <i class="fa-solid fa-face-grin-wink text-lg"></i>
          </button>
          <button class="hover:text-purple-100 cursor-pointer" @click="openFile">
            <i class="fa-solid fa-images text-lg"></i>
            <input
              ref="fileInput"
              type="file"
              accept=".gif,.jpg,.jpeg,.png,.mp4"
              class="opacity-0 w-[1px]"
              @change="parseFile"
            />
          </button>
          <span class="w-[40px]">
            <button
              class="send cursor-pointer w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center"
              :disabled="loading"
              @click.prevent="handleReply"
            >
              <i class="fa-solid fa-paper-plane text-base" v-if="!loading"></i>
              <i class="fa-solid fa-rotate loader text-base" v-else></i>
            </button>
          </span>
        </div>
      </div>

      <files :all-files="allFiles" @remove-files="removeFiles" class="-mt-4" />
      <vue-tribute :options="options">
        <div
          class="w-full relative min-h-[70px] p-2 bg-white rounded-xl"
          id="#post"
          contenteditable
          ref="reply"
          @input="checkMaxLength"
        ></div>
      </vue-tribute>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { useAuthStore } from '@/stores/auth'
import { postQuery } from '@/graphql/queries'
import PostReply from '@/components/post/PostReply.vue'
import { replyPostMutate } from '@/graphql/mutations'
import { VueTribute } from 'vue-tribute'
import ViewProfile from '@/components/profile/ViewProfile.vue'
import LikePost from '@/components/post/LikePost.vue'
import UserPost from '@/components/post/UserPost.vue'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { client, bucket, region } from '@/config/aws'
import files from '@/components/post/Files.vue'

const route = useRoute()
const auth = useAuthStore()
const newReplies: any = ref([])
const { id } = route.params

const {
  result: postResult,
  loading,
  error
} = useQuery(postQuery, { id }, { fetchPolicy: 'cache-and-network' })
const post = computed(() => postResult?.value?.post)
function enter(id) {
  console.log(id)
  const item: any = document.getElementById(id)
  if (item) {
    item.style.display = 'block'
  }
}
function leave(id) {
  const item: any = document.getElementById(id)
  if (item) {
    item.style.display = 'none'
  }
}
console.log(postResult)
const reply: any = ref(null)
const replyLen = ref(400)
const largeFileContent = ref('')
const isLarge = ref(false)
const allFiles: any = ref([])
const returnFile: any = ref([])
const fileUpload: any = ref([])
const fileInput: any = ref(null)
const emit = defineEmits(['closeAllModal', 'unchoose'])
// const post: any = ref(null)
const replyBody = ref('')
const tags: any = ref([])
const options = {
  trigger: '@',
  values: [
    { key: 'Sarah Drasner', value: 'sarah_edo' },
    { key: 'Evan You', value: 'youyuxi' },
    { key: 'Adam Wathan', value: 'adamwathan' },
    { key: 'Rich Harris', value: 'Rich_Harris' }
  ],
  noMatchTemplate: function () {
    return '<span style:"visibility: hidden;"></span>'
  },
  positionMenu: false,
  containerClass:
    'tribute-container absolute bottom-[10%] border border-base rounded font-Raleway z-50 bg-white',
  itemClass: 'font-Raleway hover:bg-base hover:text-white cursor-pointer py-1 px-2',
  selectTemplate: function (item) {
    tags.value.push(item.original.value)
    return (
      '<span contenteditable="false" class="bg-gray-200 font-medium p-1 rounded text-gray-800 font-Raleway italic cursor-pointer">@' +
      item.original.value +
      '</span>'
    )
  }
  // menuContainer: document.getElementById('make')
}

function checkMaxLength() {
  replyBody.value = reply.value.innerHTML
  replyLen.value = 400 - reply.value.textContent.length
  if (replyLen.value >= 0) {
    return true
  }
  return false
}
function parseFile() {
  const file = fileInput.value?.files[0]
  if (file) {
    console.log(file)
    if (file.size > 536870912) {
      largeFileContent.value = 'You are not allowed to upload files > 512mb'
      isLarge.value = true
      return setTimeout(() => (isLarge.value = false), 2500)
    }
    if (allFiles.value.length >= 5) {
      largeFileContent.value = 'You cannot upload more than 5 files'
      isLarge.value = true
      return setTimeout(() => (isLarge.value = false), 2500)
    }
    if (file.type === 'video/mp4') {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        allFiles.value.push({ type: 'video', src: e.target?.result })
      }
      fileUpload.value.push(file)
    } else {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = function (e) {
        allFiles.value.push({ type: 'image', src: e.target?.result })
      }
      fileUpload.value.push(file)
    }
  }
}
async function uploadFiles() {
  console.log('fileupload', region)
  fileUpload.value.forEach(async (file) => {
    const timestamp = new Date().getTime()
    const filename = timestamp + file.name
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: file
    })
    try {
      const res = await client.send(command)
      if (file.type == 'video/mp4') {
        returnFile.value.push({
          type: 'video',
          src: `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
        })
      } else {
        returnFile.value.push({
          type: 'video',
          src: `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
        })
      }
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  })
}

const { mutate, error: replyPostError } = useMutation(replyPostMutate)
async function handleReply() {
  if (checkMaxLength() && (replyLen.value != 400 || fileUpload.value.length)) {
    try {
      await uploadFiles()
      const replyPost = {
        tags: tags.value,
        comment: replyBody.value,
        files: returnFile.value,
        authorId: auth.user.id
      }
      console.log(post.value.id, replyPost)
      mutate({ postId: post.value.id, reply: replyPost })
      newReplies.value.unshift(reply.value.textContent)
      console.log(replyPostError)
    } catch (err) {
      console.log(err)
    }
  } else if (replyLen.value == 400) {
    largeFileContent.value = 'No Content in Post'
    isLarge.value = true
    return setTimeout(() => (isLarge.value = false), 2500)
  } else {
    largeFileContent.value = 'Post is too long'
    isLarge.value = true
    return setTimeout(() => (isLarge.value = false), 2500)
  }
}
function removeFiles(fileIndex: number) {
  allFiles.value = allFiles.value.filter((file, index) => {
    return index !== fileIndex
  })
}
if (post.value) {
  post.value.focus()
}
function openFile() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// watches
watch(replyBody, () => {
  const o: any = document.querySelector('.tribute-container')
  if (o) {
    console.log('0', o)
    document.querySelector('#reply')?.appendChild(o)
  }
  console.log(tags.value)
  console.log(replyPostError)

  // const o = document.querySelector('.tribute-container')
})
watch(reply, () => {
  if (reply.value) {
    reply.value.focus()
    console.log(replyPostError)
  }
})
</script>

<style>
.view {
  display: none;
}
.box {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
}
</style>

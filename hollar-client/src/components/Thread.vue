<template>
  <div class="max-w-[750px] mx-auto min-h-[screen] relative pb-[207px]">
    <!-- Main Post -->
    <div v-if="!isReply">
      <!-- top post  -->
      <top-thread
        :post="post"
        @click.prevent="router.push(`/post/@${post.author.username}/${post.id}`)"
      />
    </div>

    <div class="" v-else>
      <!-- reply.post  -->
      <top-thread
        :post="replyData?.post"
        class="hover:cursor-pointer"
        @click="router.push(`/post/@${replyData?.post.author.username}/${replyData?.post.id}`)"
      />
      <!-- reply.treplies  -->
      <top-thread :topReplies="replyData?.treplies" />
      <div class="w-[1.5px] ml-4 mt-1 mb-1 border-gray-300 border-l border-dashed h-[100px]"></div>
      <top-thread :post="replyData ? replyData : false" class="" />
    </div>

    <div
      v-if="newReplies.length || post?.replyCount > 0"
      class="w-[1.5px] ml-4 mt-1 mb-1 border-darks dark:border-gray-300 border-l border-dashed h-[100px]"
    ></div>

    <!-- newReplies  -->
    <section id="replySection" class="">
      <user-post :newReplies="newReplies" />

      <!-- <post-reply :postId="postId" :isReply="isReply" /> -->
      <!-- Reply box -->
    </section>
    <div
      v-if="auth.isAuth"
      class="fixed bottom-2 w-full max-w-[750px] bg-base dark:bg-darks dark:shadow-barshadow border border-black rounded-xl p-2"
    >
      <div class="flex justify-between pb-2 dark:text-gray-100 text-white">
        <h2 class="dark:text-gray-100 text-white font-bold dark:font-medium text-lg mb-1">
          Reply:
        </h2>
        <div class="flex items-center gap-3">
          <p class="font-Raleway italic w-12 text-ellipsis text-center">
            {{ replyLen }}
          </p>
          <button class="cursor-pointer hover:text-purple-100">
            <i class="fa-solid fa-face-grin-wink text-lg dark:text-gray-100 text-white"></i>
          </button>
          <button class="hover:text-purple-100 cursor-pointer" @click="openFile">
            <i class="fa-solid fa-images text-lg dark:text-gray-100 text-white"></i>
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
              class="send cursor-pointer w-[30px] h-[30px] rounded-full dark:bg-gray-100 bg-white flex items-center justify-center"
              :disabled="loading"
              @click.prevent="handleReply"
            >
              <i class="fa-solid fa-paper-plane text-base" v-if="!loading"></i>
              <i class="fa-solid fa-rotate loader text-base" v-else></i>
            </button>
          </span>
        </div>
      </div>
      <files :all-files="allFiles" @remove-files="removeFiles" class="-mt-5" />
      <vue-tribute :options="options">
        <div
          class="w-full relative min-h-[70px] p-2 bg-white dark:border focus:outline focus:outline-1 dark:border-black focus:outline-black dark:outline-black dark:bg-darks rounded-xl reply"
          id="#post"
          :placeholder="replyPlaceholder"
          contenteditable
          ref="reply"
          @input="checkMaxLength"
        ></div>
      </vue-tribute>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { VueTribute } from 'vue-tribute'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ViewProfile from '@/components/profile/ViewProfile.vue'
import LikePost from '@/components/post/LikePost.vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import PostReply from '@/components/post/PostReply.vue'
import UserPost from '@/components/post/UserPost.vue'
import { replyPostMutate, replyReply } from '@/graphql/mutations'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { client, bucket, region } from '@/config/aws'
import files from '@/components/post/Files.vue'
import TopThread from './TopThread.vue'

const props = defineProps(['isReply', 'post', 'loading', 'replyData', 'postId'])
const router = useRouter()
const auth = useAuthStore()
const newReplies: any = ref([])
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
const replyPlaceholder = computed(() =>
  props.replyData
    ? `reply @${props.replyData?.authorDetails.username}...`
    : `reply @${props.post?.authorDetails.username}...`
)
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
    'tribute-container fixed bottom-[22%] border shadow-barshadow rounded z-50 bg-white dark:bg-darks dark:shadow-barshadow mx-auto left-[50%] -translate-x-[50%] w-[60%] dark:border-black border-dashed',
  itemClass:
    'hover:bg-slate-100 hover:text-darks dark:hover:bg-base dark:hover:text-white cursor-pointer py-1 px-2',
  selectTemplate: function (item) {
    tags.value.push(item.original.value)
    return (
      '<span contenteditable="false" class="bg-slate-100 text-darks dark:bg-black p-1 rounded-lg dark:text-white cursor-pointer">@' +
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

const { mutate, onDone, error: replyPostError } = useMutation(replyPostMutate)
const {
  mutate: replyRepliesMutate,
  onDone: replyRonDone,
  error: replyReplyError
} = useMutation(replyReply)
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
      console.log(props.postId, replyPost)
      if (!props.isReply) {
        mutate({ postId: props.postId, reply: replyPost })
        onDone((result) => {
          console.log(result)
          newReplies.value.unshift({ id: result.data.replyPost.id, reply: reply.value.innerHTML })
          reply.value.innerHTML = ''
        })
      } else {
        replyRepliesMutate({ replyId: props.postId, reply: replyPost })
        onDone((result) => {
          console.log(result)
          newReplies.value.unshift({
            id: result.data.replyReplies.id,
            reply: reply.value.innerHTML
          })
          reply.value.innerHTML = ''
        })
      }
      console.log(replyReplyError)
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
function openFile() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

// const element = ref(document.getElementById('replySection'))
// console.log(element, 'el')
// element.value?.scrollIntoView(true)

// // watches
// watch(element, () => {
//   element.value?.scrollIntoView(true)
// })
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
// watch()
watch(reply, () => {
  if (reply.value) {
    reply.value.focus()
    console.log(replyReplyError)
    console.log(replyPostError)
  }
})
</script>

<style>
[contenteditable='true']:empty:before {
  content: attr(placeholder);
  pointer-events: none;
  display: block; /* For Firefox */
  color: grey;
  font-style: italic;
  font-family: 'Trebuchet Ms';
}
</style>

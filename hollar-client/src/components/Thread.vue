<template>
  <div class="max-w-[750px] mx-auto min-h-[screen] relative pb-[207px]" v-if="post">
    <!-- Main Post -->
    <div v-if="!isReply">
      <!-- top post  -->
      <top-thread
        id=""
        :post="post"
        :main="true"
        @click.prevent="router.push(`/post/@${post.author.username}/${post.id}`)"
      />
    </div>

    <div class="" v-else>
      <!-- reply.post  -->
      <replyHeader :key="post?.id" :id="post?.id" :authorId="post?.authorDetails.id" />
      <!-- <top-thread
        :post="replyData?.post"
        class="hover:cursor-pointer"
        @click="router.push(`/post/@${replyData?.post.author.username}/${replyData?.post.id}`)"
      /> -->
      <!-- reply.treplies  -->
      <!-- <top-thread :topReplies="replyData?.treplies" /> -->
      <div
        id="replySection"
        class="w-[1.5px] ml-4 mt-1 mb-1 border-gray-300 border-l border-dashed h-[100px]"
      ></div>
      <replies :results="[post]" :main="true" />
    </div>

    <div
      v-if="newReplies.length || post?.replyCount > 0"
      class="w-[1.5px] ml-4 mt-1 mb-1 border-gray-300 border-l border-dashed h-[100px]"
    ></div>

    <div
      v-if="!post?.replyCount && !newReplies.length"
      class="text-center mt-16 dark:font-semibold text-md text-darks dark:text-gray-200"
    >
      <!-- No replies yet ... -->
    </div>

    <!-- newReplies  -->
    <section id="replySection" class="">
      <user-post :newReplies="newReplies" />

      <post-reply
        :key="post?.id"
        :author="post?.authorDetails.id"
        :postId="postId"
        :isReply="isReply"
      />
      <!-- Reply box -->
    </section>
    <div
      v-if="auth.isAuth"
      id="smovie"
      class="fixed bottom-2 w-full max-w-[750px] bg-white dark:bg-darks shadow-barshadow border border-neutral-700 dark:border-black rounded-xl p-2"
    >
      <div class="flex justify-between pb-2 dark:text-gray-100 text-white">
        <h2 class="dark:text-gray-200 text-neutral-700 font-bold text-lg mb-1 font-Raleway">
          Reply:
        </h2>
        <div class="flex items-center gap-3">
          <p
            class="font-Raleway font-semibold w-12 text-neutral-700 dark:text-gray-200 text-ellipsis text-center"
          >
            {{ replyLen }}
          </p>
          <button class="cursor-pointer hover:text-purple-100">
            <i class="fa-solid fa-face-grin-wink text-lg text-neutral-700 dark:text-gray-200"></i>
          </button>
          <button class="hover:text-purple-100 cursor-pointer" @click="openFile">
            <i class="fa-solid fa-images text-lg dark:text-gray-200 text-neutral-700"></i>
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
              class="send cursor-pointer w-[30px] h-[30px] rounded-full bg-white dark:bg-gray-200 border border-neutral-700 dark:border-0 flex items-center justify-center"
              :disabled="loading"
              @click.prevent="handleReply"
            >
              <i class="fa-solid fa-paper-plane text-neutral-700" v-if="!loading"></i>
              <i class="fa-solid fa-rotate loader text-base" v-else></i>
            </button>
          </span>
        </div>
      </div>
      <div class="max-h-[300px] overflow-y-scroll" id="smovie">
        <files :all-files="allFiles" @remove-files="removeFiles" class="-mt-5" />
        <vue-tribute :options="options">
          <div
            class="w-full relative min-h-[70px] p-2 bg-white border dark:focus:border-[1.5px] focus:outline-0 dark:text-gray-200 border-neutral-700 dark:border-black dark:shadow-barshadow dark:bg-darks rounded-xl reply"
            id="#post"
            :placeholder="replyPlaceholder"
            contenteditable
            ref="reply"
            @input="checkMaxLength"
          ></div>
        </vue-tribute>
      </div>
      <large-file
        v-show="isLarge"
        :content="largeFileContent"
        class="w-[300px] left-[50%] -translate-x-[50%] mx-auto mt-[100px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { VueTribute } from 'vue-tribute'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Replies from './post/Replies.vue'
import { tagSearchUsersQuery } from '@/graphql/queries'
import replyHeader from './replyHeader.vue'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import PostReply from '@/components/post/PostReply.vue'
import UserPost from '@/components/post/UserPost.vue'
import { replyPostMutate, replyReply } from '@/graphql/mutations'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { client, bucket, region } from '@/config/aws'
import LargeFile from './post/LargeFile.vue'
import files from '@/components/post/Files.vue'
import TopThread from './TopThread.vue'
import { selectTemplate, menuItemTemplate } from './tag'
import Avatar from './Avatar.vue'

const props = defineProps(['isReply', 'post', 'loading', 'replyData', 'postId'])

const router = useRouter()
const route = useRoute()
const id = ref(String(route.params.id))
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
  values: function (text, cb) {
    tagSearch(text, (users) => cb(users))
  },
  lookup: 'username',
  fillAttr: 'username',
  noMatchTemplate: function () {
    return '<span class="hidden border-0 child"></span>'
  },
  positionMenu: false,
  containerClass:
    'tribute-container fixed border shadow-barshadow rounded-lg z-50 bg-white dark:bg-darks dark:shadow-barshadow mx-auto left-[50%] block -translate-x-[50%] w-[500px] border-neutral-700 dark:border-black parent',
  itemClass:
    'hover:bg-slate-100 hover:text-darks dark:hover:bg-base dark:hover:text-white cursor-pointer py-1 px-2 rounded-lg',
  selectTemplate,
  menuItemTemplate

  // menuContainer: document.getElementById('make')
}
const username = ref('')
const { result, load, refetch } = useLazyQuery(tagSearchUsersQuery, { username })

function tagSearch(text, cb) {
  username.value = text
  load() || refetch()
  cb(result.value?.tagSearchUsers)
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
    } catch (err) {
      console.error(err)
    }
  })
}

const { mutate, onDone, error: replyPostError } = useMutation(replyPostMutate)
const {
  mutate: replyRepliesMutate,
  onDone: replyRepliesDone,
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
      const authorDetails = {
        id: auth.user?.id,
        username: auth.user?.username,
        avatar: auth.user?.avatar,
        fullName: auth.user?.fullName,
        favourite: auth.user?.favourite
      }
      if (!props.isReply) {
        mutate({ postId: props?.postId, reply: replyPost })
        onDone((result) => {
          newReplies.value.push({ ...result.data.replyPost, authorDetails })
          reply.value.innerHTML = ''
        })
      } else {
        replyRepliesMutate({ replyId: props?.postId, reply: replyPost })
        replyRepliesDone((result) => {
          console.log(result)
          newReplies.value.push({
            ...result.data.replyReply,
            authorDetails
          })

          reply.value.innerHTML = ''
        })
      }
    } catch (err) {
      console.error(err)
    }
  } else if (replyLen.value == 400) {
    largeFileContent.value = 'No Content in Post'
    isLarge.value = true
    return setTimeout(() => (isLarge.value = false), 2500)
  } else {
    largeFileContent.value = 'Reply is too long'
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

// // watches
// watch(element, () => {
//   element.value?.scrollIntoView(true)
// })
watch(
  () => route.params.id,
  (newId, oldId) => {
    id.value = String(route.params.id)
    newReplies.value = []
  }
)

watch(replyBody, () => {
  const o: any = document.querySelector('.tribute-container')
  if (o) {
    document.querySelector('#reply')?.appendChild(o)
  }
})
// watch()

watch(replyReplyError, () => {
  if (reply.value) {
    reply.value.focus()
  }
})
</script>

<style scoped>
[contenteditable='true']:empty:before {
  content: attr(placeholder);
  pointer-events: none;
  display: block; /* For Firefox */
  color: grey;
  font-family: 'Karla';
}

#post::-webkit-scrollbar {
  width: 10px;
  cursor: pointer;
  background: blue;
}

/* Track */
#post::-webkit-scrollbar-track {
  border-radius: 10px;
  cursor: pointer;
  background: red;
}

/* Handle */
#post::-webkit-scrollbar-thumb {
  /*background: rgba(88, 30, 235, 0.3);*/
  background: gainsboro;
  border-radius: 10px;
  cursor: pointer;
}

/* Handle on hover */
#post::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>

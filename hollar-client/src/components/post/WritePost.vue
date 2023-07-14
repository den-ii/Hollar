<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-50 flex flex-col items-center justify-center"
  >
    <div
      class="w-[100vw] h-[100vh] fixed top-0 bg-gray-800 dark:bg-transparent dark:backdrop-blur-lg opacity-30 backdrop-blur"
      @click="$emit('closeAllModal')"
    ></div>

    <div
      class="bg-white dark:bg-darks dark:shadow-barshadow w-[80%] min-h-[250px] h-auto max-h-[300px] max-w-[800px] rounded-2xl z-40 relative overflow-auto"
      id="writepost"
    >
      <!-- Write Post -->

      <div
        class="sticky h-[50px] p-3 pr-1 backdrop-blur-sm bg-base dark:bg-darks dark:shadow-barshadow text-white flex items-center justify-between z-50"
      >
        <div class="flex items-center gap-3">
          <h1 class="font-Raleway font-bold post-head">Post</h1>
          <p class="text-white italic font-Raleway">@{{ username }}</p>
        </div>
        <div class="font-Raleway flex gap-3 items-center">
          <button @click="$emit('unchoose')" class="cursor-pointer hover:text-purple-100">
            <i class="fa-solid fa-backward"></i>
          </button>

          <span>{{ title }}</span>
        </div>

        <div class="flex items-center gap-3">
          <p class="font-bold font-Raleway w-12 text-ellipsis text-center">{{ postLen }}</p>
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
              @click.prevent="handlePost"
            >
              <i class="fa-solid fa-paper-plane text-base" v-if="!loading"></i>
              <i class="fa-solid fa-rotate loader text-base" v-else></i>
            </button>
          </span>
        </div>
      </div>
      <!-- for files -->
      <files :all-files="allFiles" @remove-files="removeFiles" />

      <div class="relative py-3 px-2 dark:bg-darks" ref="menuContainer" id="post">
        <vue-tribute :options="options">
          <div
            class="w-full min-h-[150px] -mt-1 pt-3 p-2 focus:outline-none overflow-x-hidden"
            ref="post"
            id="textarea"
            @input="checkMaxLength"
            contenteditable
          ></div>
        </vue-tribute>
      </div>
    </div>
    <large-file v-show="isLarge" :content="largeFileContent" />
  </div>
</template>

<script setup lang="ts">
// imports
import { computed, ref, watch, reactive } from 'vue'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { client, bucket, region } from '@/config/aws'
import LargeFile from './LargeFile.vue'
import { VueTribute } from 'vue-tribute'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@vue/apollo-composable'
import { createPost } from '@/graphql/mutations'
import Files from './Files.vue'

// refs
const emit = defineEmits(['closeAllModal', 'unchoose'])
const props = defineProps(['chosenFilm'])
const menuContainer: any = ref(null)
const auth = useAuthStore()
const show = ref(true)
const postLen = ref(400)
const largeFileContent = ref('')
const isLarge = ref(false)
const allFiles: any = ref([])
const returnFile: any = ref([])
const fileUpload: any = ref([])
const fileInput: any = ref(null)
const post: any = ref(null)
const postBody = ref('')
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
    'tribute-container absolute bottom-[10%] border border-base rounded left-2 font-Raleway z-50 bg-white',
  itemClass: 'font-Raleway hover:bg-base hover:text-white cursor-pointer py-1 px-2',
  selectTemplate: function (item) {
    tags.value.push(item.original.value)
    return (
      '<span contenteditable="false" class="bg-base font-medium p-1 rounded text-white font-Raleway italic cursor-pointer">@' +
      item.original.value +
      '</span>'
    )
  }
  // menuContainer: document.getElementById('make')
}

// computed
const title = computed(() =>
  props.chosenFilm?.title.length > 19
    ? props.chosenFilm?.title.slice(0, 19) + '...'
    : props.chosenFilm?.title
)
const username = computed(() =>
  auth?.user.username > 12 ? auth.user.username.slice(0, 12) + '...' : auth.user.username
)

const { mutate, loading, error, onDone } = useMutation(createPost)

// methods
function checkMaxLength() {
  postBody.value = post.value.innerHTML
  postLen.value = 400 - post.value.textContent.length
  if (postLen.value >= 0) {
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
async function handlePost() {
  if (checkMaxLength() && (postLen.value != 400 || fileUpload.value.length)) {
    try {
      await uploadFiles()
      const { image, title, year, runningTimeInMinutes } = props.chosenFilm
      console.log('chosenFilm', props.chosenFilm)
      const movie = {
        image: {
          height: image.height,
          url: image.url,
          width: image.width
        },
        title,
        runningTimeInMinutes,
        year
      }
      const post = {
        tags: tags.value,
        comment: postBody.value,
        title: title,
        tv: movie,
        files: returnFile.value,
        authorId: auth.user.id,
        cover: movie.image.url
      }
      console.log(post)
      mutate({ post })
      emit('unchoose')
      emit('closeAllModal')
    } catch (err) {
      console.log(err)
    }
  } else if (postLen.value == 400) {
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

watch(error, () => {
  console.log(error)
})
// watches
watch(postBody, () => {
  const o: any = document.querySelector('.tribute-container')
  if (o) {
    console.log('0', o)
    document.querySelector('#post')?.appendChild(o)
  }
  console.log(tags.value)

  // const o = document.querySelector('.tribute-container')
})
watch(post, () => {
  if (post.value) {
    post.value.focus()
  }
})
</script>
<style scoped>
.titlerotate {
  transform: rotateZ(90deg);
}
.sticky {
  position: sticky;
  top: 0px;
}
.send:hover {
  width: 33px;
  height: 33px;
}
.send:hover i {
  font-size: 1.3rem;
}
.stickybottom {
  position: sticky;
  top: 30px;
  border: 1px solid black;
}
.post-head {
  font-size: 1.3rem;
}
#writepost::-webkit-scrollbar {
  width: 6px;
  cursor: pointer;
}

/* Track */
#writepost::-webkit-scrollbar-track {
  border-radius: 10px;
  cursor: pointer;
}

/* Handle */
#writepost::-webkit-scrollbar-thumb {
  background: rgba(88, 30, 235, 0.7);
  /* background: gainsboro; */
  border-radius: 6px;
  cursor: pointer;
}

/* Handle on hover */
#smovie::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.tribute-container > ul > li {
  cursor: pointer;
}
</style>

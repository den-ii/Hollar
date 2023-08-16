<template>
  <div v-if="allFiles.length" class="flex mt-3 p-2 gap-3 flex-wrap">
    <div v-for="(file, index) in allFiles" :key="index" class="relative">
      <template v-if="file.type == 'video'">
        <video autoplay muted alt="photo" class="w-[150px] h-[100px]">
          <source :src="file.src" />
        </video>
        <button
          @click="$emit('removeFiles', index)"
          class="bg-white dark:bg-base dark:text-white text-base absolute w-[20px] h-[20px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer"
          aria-label="remove image"
        >
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </template>
      <template v-else>
        <img :src="file.src" alt="photo" class="w-[150px] h-[100px] object-cover rounded" />
        <button
          @click.prevent="$emit('removeFiles', index)"
          class="bg-neutral-700 text-white dark:bg-base dark:text-white absolute w-[20px] h-[20px] rounded-full flex items-center justify-center -right-3 -top-3 cursor-pointer"
          aria-label="remove image"
        >
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['allFiles'])
defineEmits(['removeFiles'])
</script>

<style scoped></style>

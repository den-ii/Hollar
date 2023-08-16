<template>
  <span
    v-if="!src"
    class="rounded-full flex items-center justify-center bg-gray-400 font-bold text-white"
    :class="dpSize || size"
  >
    {{ dpName ? dp(dpName) : '' }}
  </span>

  <span v-else>
    <avatar-skeleton>
      <div class="" :class="size">
        <img :src="src" class="block object-cover rounded-full" ref="avatar" @error="imageError" />
      </div>
    </avatar-skeleton>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { imageError } from './skeleton/utils'
import AvatarSkeleton from './skeleton/AvatarSkeleton.vue'
import { dp } from '@/components/post/utils'
defineProps(['src', 'post', 'size', 'dpName', 'dpSize'])
const avatar: any = ref(null)
</script>

<style scoped>
img {
  height: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>

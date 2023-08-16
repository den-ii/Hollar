<template>
  <div class="max-w-[750px] mt-[100px] mx-auto min-h-[screen] relative pb-[207px]" id="top">
    <!-- {{ post }} -->
    <thread :postId="id" :post="post" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, } from 'vue'
import { useRoute } from 'vue-router'
import Thread from '../components/Thread.vue'
import { useQuery } from '@vue/apollo-composable'
import { useAuthStore } from '@/stores/auth'
import { postQuery } from '@/graphql/queries'

const route = useRoute()
const auth = useAuthStore()
const { id } = route.params

console.log(id)

const vars = auth?.user?.id ? { id, userId: auth.user.id } : { id }
const {
  result: postResult,
  loading,
  error
} = useQuery(postQuery, vars, { fetchPolicy: 'cache-and-network' })
const post = computed(() => postResult?.value?.post)
console.error(error)

nextTick(() => document.getElementById('top')?.scrollIntoView())
</script>

<style>
.view {
  display: none;
}
.box {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px;
}
</style>

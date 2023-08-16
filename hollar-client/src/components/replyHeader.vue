<template>
  <div>
    <div v-if="result?.replyRepliesHeader.post">
      <top-thread :post="result?.replyRepliesHeader.post" />
    </div>
    <div v-else class="h-[100px] border border-white"></div>
    <div v-if="result?.replyRepliesHeader.treplies.length > 0">
      <div class="w-[1.5px] ml-4 mt-1 mb-1 border-gray-300 border-l border-dashed h-[100px]"></div>
      <replies :results="result?.replyRepliesHeader.treplies" />
    </div>
    <!-- {{ result }} -->
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import Replies from './post/Replies.vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { replyHeaderQuery } from '@/graphql/queries'
import TopThread from './TopThread.vue'

const route = useRoute()
const auth = useAuthStore()
const props = defineProps(['id', 'authorId'])

const vars = auth?.user?.id
  ? { id: props.id, authorId: props.authorId, userId: auth.user.id }
  : { id: props.id, authorId: props.authorId }

const replySection: any = ref(null)
let { result, loading, error } = useQuery(replyHeaderQuery, vars, {
  fetchPolicy: 'cache-and-network'
})

// watches
nextTick(() => document.getElementById('replySection')?.scrollIntoView())
// watch()
</script>

<style scoped></style>

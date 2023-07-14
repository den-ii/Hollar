<template>
  <div class="max-w-[750px] mx-auto min-h-[screen] relative pb-[207px]">
    <thread :postId="id" :replyData="reply" :isReply="true" />
    <!-- headReply -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Thread from '@/components/Thread.vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { replyQuery } from '@/graphql/queries'
import { useRoute } from 'vue-router'

const route = useRoute()
const { id } = route.params
const reply = computed(() => replyResult?.value?.reply)

const {
  result: replyResult,
  loading,
  error
} = useQuery(replyQuery, { id }, { fetchPolicy: 'cache-and-network' })

watch([reply, error], () => {
  console.log(reply)
  console.log(error)
})
</script>

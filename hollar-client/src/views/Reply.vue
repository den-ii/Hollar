<template>
  <div class="max-w-[750px] mt-[100px] mx-auto min-h-[screen] relative pb-[207px]">
    <thread :key="key" :postId="id" :post="replyResult?.reply" :isReply="true" />

    <!-- headReply -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Thread from '@/components/Thread.vue'
import { useAuthStore } from '@/stores/auth'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { replyQuery } from '@/graphql/queries'
import { useRoute } from 'vue-router'

// const props = defineProps(['id'])
const route = useRoute()
const auth = useAuthStore()
const id = ref(route.params.id)
const key = ref(String(id))
const reply = computed(() => replyResult?.value?.reply)
const vars = auth?.user?.id ? { id, userId: auth.user.id } : { id }

let {
  result: replyResult,
  loading,
  error
} = useQuery(replyQuery, vars, { fetchPolicy: 'cache-and-network' })
watch(
  () => route.params.id,
  (newId, oldId) => {
    id.value = route.params.id
  }
)
</script>

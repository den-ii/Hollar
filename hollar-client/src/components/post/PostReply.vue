<template>
  <div>
    <div v-if="!isReply">
      <reply
        v-if="authorPostReplyResult"
        :key="postId"
        :results="authorPostReplyResult?.authorPostReplies"
      />
      <reply :results="postRepliesResult?.postReplies" />
    </div>
    <div v-else>
      <reply
        v-if="authorReplyRepliesResult"
        :key="postId"
        :results="authorReplyRepliesResult?.authorReplyReplies"
      />
      <reply :results="replyResult?.replyReplies" />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'

import { useAuthStore } from '@/stores/auth'
import {
  postRepliesQuery,
  replyRepliesQuery,
  authorPostRepliesQuery,
  authorReplyRepliesQuery
} from '@/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import Reply from './Replies.vue'

const props = defineProps(['author', 'postId', 'isReply'])
const auth = useAuthStore()

const {
  result: authorPostReplyResult,
  loading: authorPostReplyLoading,
  error: authorPostReplyError
} = useQuery(authorPostRepliesQuery, () => ({
  id: props.postId,
  authorId: props.author,
  userId: auth?.user?.id ?? ''
}))

const {
  result: authorReplyRepliesResult,
  loading: authorReplyRepliesLoading,
  error: authorReplyRepliesError
} = useQuery(authorReplyRepliesQuery, () => ({
  id: props.postId,
  authorId: props.author,
  userId: auth?.user?.id ?? ''
}))

const {
  result: postRepliesResult,
  loading: postRepliesLoading,
  fetchMore: postRepliesFetchMore,
  error: postRepliesError
} = useQuery(
  postRepliesQuery,
  () => ({
    id: props.postId,
    authorId: props.author,
    userId: auth?.user.id ?? '',
    cursor: '',
    limit: 5
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)

const {
  result: replyResult,
  loading: replyLoading,
  fetchMore: replyFetchMore,
  error: replyError
} = useQuery(
  replyRepliesQuery,
  () => ({
    id: props.postId,
    authorId: props.author,
    userId: auth?.user.id ?? '',
    cursor: '',
    limit: 5
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)
// load rooms function
function loadMore() {
  if (!props.isReply) {
    postRepliesFetchMore({
      variables: {
        cursor: postRepliesResult?.value?.postWithReplies?.slice(-1)[0].createdAt
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // No new feed posts
        if (!fetchMoreResult) return previousResult

        // Concat previous feed with new feed posts

        return {
          ...previousResult,
          postWithReplies: [...previousResult.postWithReplies, ...fetchMoreResult.postWithReplies]
        }
      }
    })
  } else {
    replyFetchMore({
      variables: {
        cursor: replyResult?.value?.replyWithReplies?.slice(-1)[0].createdAt
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // No new feed posts
        if (!fetchMoreResult) return previousResult

        // Concat previous feed with new feed posts

        return {
          ...previousResult,
          replyWithReplies: [
            ...previousResult.replyWithReplies,
            ...fetchMoreResult.replyWithReplies
          ]
        }
      }
    })
  }
}
// load room on initial render

function infiniteScroll() {
  if (!replyLoading.value || !postRepliesLoading.value) {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 100
    if (bottomOfWindow) {
      loadMore()
    }
  }
}
watch([replyError, replyResult], () => {
  console.log(replyResult)
  console.log(replyError)
})
// infinite scrollin
window.addEventListener('scroll', infiniteScroll)
onUnmounted(() => window.removeEventListener('scroll', infiniteScroll))
</script>

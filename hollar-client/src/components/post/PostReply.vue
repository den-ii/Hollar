<template>
  <div>
    <div v-if="!isReply">
      <reply :results="postResult?.postWithReplies" />
    </div>
    <div v-else>
      <reply :results="replyResult?.replyWithReplies" />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { postWithReplies, replyWithReplies } from '@/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import Reply from './Replies.vue'

const props = defineProps(['postId', 'isReply'])

const {
  result: postResult,
  loading: postLoading,
  fetchMore: postFetchMore,
  error: postError
} = useQuery(
  postWithReplies,
  () => ({
    id: props.postId,
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
  replyWithReplies,
  () => ({
    id: props.postId,
    cursor: '',
    limit: 5
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)
// load rooms function
function loadMore() {
  if (!props.isReply) {
    postFetchMore({
      variables: {
        cursor: postResult?.value?.postWithReplies?.slice(-1)[0].createdAt
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
  if (!replyLoading.value || !postLoading.value) {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 100
    if (bottomOfWindow) {
      loadMore()
    }
  }
}

// infinite scrollin
window.addEventListener('scroll', infiniteScroll)
onUnmounted(() => window.removeEventListener('scroll', infiniteScroll))
</script>

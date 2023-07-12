<template>
  <div>
    <reply :results="result?.postWithReplies" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { postWithReplies } from '@/graphql/queries'
import { useQuery } from '@vue/apollo-composable'
import Reply from './Replies.vue'

const props = defineProps(['postId'])

const { result, loading, fetchMore, error } = useQuery(
  postWithReplies,
  () => ({
    id: props.postId,
    cursor: '',
    limit: 5
  }),
  { notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network' }
)

// load rooms function
function loadMore() {
  fetchMore({
    variables: {
      cursor: result?.value?.postWithReplies?.slice(-1)[0].createdAt
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
}
// load room on initial render

function infiniteScroll() {
  console.log(loading)
  if (!loading.value) {
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

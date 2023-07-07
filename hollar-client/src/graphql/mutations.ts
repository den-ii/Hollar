import { useMutation } from '@vue/apollo-composable'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from '@/Apollo'
import gql from 'graphql-tag'

// VerifyUser
export const { mutate: verifyUser, error: verifyUserError } = provideApolloClient(apolloClient)(() => useMutation(gql`
    mutation verifyUser ($token: String!){
      verifyUser(token: $token) {
        message
        code
      }
    }
  `)
)

// CreateRoom
export const createRoomMutate = gql`
    mutation createRoom ($name: String!, $cover: String!, $creator: String, $tv: ITv, $description: String){
      createRoom(name: $name, cover: $cover, creator: $creator , tv: $tv, description: $description) {
        id
      }
    }
  `
//createPodt
export const createPost = gql`
  mutation createPost ($post: createPostInput!){
    createPost(post: $post) {
      id
    }
}
`





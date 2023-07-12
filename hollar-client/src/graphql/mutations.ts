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

//createPost
export const createPost = gql`
  mutation createPost ($post: createPostInput!){
    createPost(post: $post) {
      id
    }
}
`


//replyPost
export const replyPostMutate = gql`
  mutation replyPost ($postId: ID!, $reply: Ireply! ){
    replyPost(postId: $postId, reply: $reply) {
      id
    }
}
`

//createProfile
export const editProfile = gql`
  mutation editProfile ($profile: IEditProfile!){
    editProfile(profile: $profile) {
      id
      username
      avatar
      favourite
      bg
      fullName
      followers
      favourite
      
    }
}
`
//likeRoom
export const likeRoom = gql`
  mutation likeRoom ($roomId: ID!, $userId: ID!){
    likeRoom( roomId: $roomId, userId: $userId) {
      id
      likes
      dislikes
    }
}
`
//dislikeRoom
export const dislikeRoom = gql`
  mutation dislikeRoom ($roomId: ID!, $userId: ID!,) {
    dislikeRoom(roomId: $roomId, userId: $userId,) {
      id
      likes
      dislikes
    }
}
`

//likePost
export const likePost = gql`
  mutation likePost ($postId: ID!, $userId: ID!,) {
    likePost(postId: $postId, userId: $userId,) {
      id
      likes
    }
}
`
//unlikePost
export const unlikePost = gql`
  mutation unlikePost ($postId: ID!, $userId: ID!,) {
    unlikePost(postId: $postId, userId: $userId,) {
      id
      likes
    }
}
`
//likePost
export const likeReply = gql`
  mutation likeReply ($replyId: ID!, $userId: ID!,) {
    likeReply(replyId: $replyId, userId: $userId,) {
      id
      likes
    }
}
`
//unlikePost
export const unlikeReply = gql`
  mutation unlikeReply ($replyId: ID!, $userId: ID!,) {
    unlikeReply(replyId: $replyId, userId: $userId,) {
      id
      likes
    }
}
`



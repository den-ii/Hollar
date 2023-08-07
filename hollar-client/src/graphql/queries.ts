// imports
import gql from 'graphql-tag'


// VARS


//Register
export const registerQuery = gql` 
query tryCreateUserWithEmail($user: createAUser!) {
  tryCreateUserWithEmail(user: $user) {
    message
    code
  }
}
`
// Login
export const loginQuery = gql`
query loginWithEmail($loginUser: loginUser!) {
  loginWithEmail(loginUser: $loginUser) {
    token
    user {
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
}
`

// checkValidUsername
export const invalidUsernameQuery = gql`
query invalidUsername($username: String!) {
  invalidUsername(username: $username){
    message
    code

  }
}
`

// checkValidEmail
export const invalidEmailQuery = gql`
query invalidEmail($email: String!) {
  invalidEmail(email: $email){
    message
    code

  }
}
`
// moviesearch
export const searchTvTitlesQuery = gql`
query searchTvTitles($title: String!){
  searchTvTitles(title: $title) {
    image {
      height
       url
      width
     }
     id
     title
     inRoom
  }
}`

// roombyID
export const roomQuery = gql`
query room($id: ID!){
  room(id: $id) {
    name
    cover
    posts
    likes
    dislikes
  }
}`

export const searchRoomsQuery = gql`
query searchRooms($cursor: String, $limit: Int, $search: String!){
  searchRooms(cursor: $cursor, limit: $limit, search: $search) {
    id
    name
    cover
    likes
    dislikes
    updatedAt
  }
}`

// getAllRooms
export const roomsPaginateQuery = gql`
query roomsPaginate($cursor: String, $limit: Int, $userId: ID){
  roomsPaginate(cursor: $cursor, limit: $limit, userId: $userId) {
      id
      name
      cover
      dislikes
      likesCount
      dislikesCount
      userLiked
      userDisliked
      updatedAt
  }
}`

export const roomPosts = gql`
query roomPosts($id: ID!, $cursor: String!, $limit: Int!, $userId: ID){
  roomPosts(id: $id, cursor: $cursor, limit: $limit, userId: $userId) {
    id
    likesCount
    authorDetails{
      username
      fullName
      id
      avatar
      favourite
    }
    comment
    replyCount
    userLiked
    createdAt
  }
}
`

export const postQuery = gql`
query post($id: ID!, $userId: ID){
  post(id: $id, userId: $userId) {
    id
    authorDetails {
      id
      avatar
      username
      favourite
      fullName
    }
    replyCount
    roomDetails {
      id
      name
      cover
    }
    comment
    likesCount
    userLiked
    createdAt
}
}
`

export const authorPostRepliesQuery = gql`
query authorPostReplies($id: ID!, $authorId: ID!, $userId: ID){
  authorPostReplies(id: $id, authorId: $authorId, userId: $userId) {
    id
    comment
    authorDetails {
      id
      avatar
      username
      favourite
      fullName
    }
    likesCount
    replyCount
    userLiked
    createdAt
  }
}
`
export const authorReplyRepliesQuery = gql`
query authorReplyReplies($id: ID!, $authorId: ID!, $userId: ID){
  authorReplyReplies(id: $id, authorId: $authorId, userId: $userId) {
    id
    comment
    authorDetails {
      id
      avatar
      username
      favourite
      fullName
    }
    likesCount
    replyCount
    userLiked
    createdAt
  }
}
`

export const postRepliesQuery = gql`
query postReplies($id: ID!, $authorId: ID!, $userId: ID, $cursor: String, $limit: Int){
  postReplies(id: $id, authorId: $authorId, userId: $userId, cursor: $cursor, limit: $limit) {
    id
    comment
    authorDetails {
      id
      avatar
      username
      favourite
      fullName
    }
    likesCount
    replyCount
    userLiked
    createdAt
  }
}
`


export const replyQuery = gql`
 query reply($id: ID!, $userId: ID){
  reply(id: $id, userId: $userId){
  id
  comment
  authorDetails{
    id
    fullName
    avatar
    username
    favourite
  }
  userLiked
  likesCount
  replyCount
  
 }
 }
`
export const replyHeaderQuery = gql`
  query replyRepliesHeader($id: ID!, $authorId: ID!, $userId: ID){
  replyRepliesHeader(id: $id, authorId: $authorId, userId: $userId) {
    treplies {
      id
      comment
      authorDetails{
        id
        fullName
        avatar
        username
        favourite
      }
      likesCount
      userLiked
      replyCount
    }
    post {
      id
      comment
      authorDetails{
        id
        fullName
        avatar
        username
        favourite
      }
      roomDetails {
      id
      name
      cover
      }
      likesCount
      userLiked
      replyCount
    }
    
  }
}
`
export const replyRepliesQuery = gql`
query replyReplies($id: ID!, $authorId: ID!, $userId: ID, $cursor: String, $limit: Int){
  replyReplies(id: $id, authorId: $authorId, userId: $userId, cursor: $cursor, limit: $limit) {
    id
    comment
    authorDetails {
      id
      avatar
      username
      favourite
      fullName
    }
    likesCount
    replyCount
    userLiked
    createdAt
  }
}
`
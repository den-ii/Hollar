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
query roomsPaginate($cursor: String, $limit: Int){
  roomsPaginate(cursor: $cursor, limit: $limit) {
      id
      name
      tv {
        image {
          url
        }
      }
      cover
      likes
      dislikes
      createdAt
      updatedAt
  }
}`

export const roomPosts = gql`
query roomPosts($id: ID!, $cursor: String!, $limit: Int!){
  roomPosts(id: $id, cursor: $cursor, limit: $limit) {
    id   
    posts{
      author {
        fullName
        username
        avatar
        favourite
        }
      id
      tags
      comment
      likes
      replies
      }

  }
}
`

export const postQuery = gql`
query post($id: ID!){
  post(id: $id) {
    id
    author {
      id
      avatar
      username
      favourite
      fullName
    }
    comment
    room {
      id
      name
      cover
    }
    replies{
      id
    }
    likes{
      id
    }
}
}
`
// export const replyQuery = gql`
// query reply($id: ID!){
//   reply(id: $id) {
//     id
//     author {
//       id
//       avatar
//       username
//       favourite
//       fullName
//     }
//     comment
//     room {
//       id
//       name
//       cover
//     }
//     replies
//     likes
// }
// }
// `


export const postWithReplies = gql`
query postWithReplies($id: ID!, $cursor: String, $limit: Int){
  postWithReplies(id: $id, cursor: $cursor, limit: $limit) {
     id
     author{
      username
      avatar
      favourite
      fullName
     }
     comment
     replies{
      id
     }
     likes{
      id
     }
     createdAt
     updatedAt
    
  }
}
`
export const replyQuery = gql`
 query reply($id: ID!){
  reply(id: $id){
  id
  comment
  likes{
    id
  }
  replies{
    id
  }
  author{
    id
    fullName
    avatar
    username
    favourite
  }
  treplies{
    id
    comment
    author {
      id
      fullName
      avatar
      username
      favourite
    }
  }
  post{
    id
    room{
      id
      cover 
      name
    }
    comment
    author{
      fullName
      avatar
      id
      favourite
      username
    }
    likes{
      id
    }
    replies{
      id
    }
  }
  
 }
 }
`
export const replyWithReplies = gql`
query replyWithReplies($id: ID!, $cursor: String, $limit: Int){
  replyWithReplies(id: $id, cursor: $cursor, limit: $limit) {
     id
     author{
      username
      avatar
      favourite
      fullName
     }
     post{
      id
      room {
        cover
        name
      }
     }
     comment
     treplies
     likes{
      id
     }
     createdAt
     updatedAt
    
  }
}
`
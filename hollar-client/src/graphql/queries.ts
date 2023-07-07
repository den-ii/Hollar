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
      avatar
      color
      fullName
      username
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
query invalidUsername($email: String!) {
  invalidUsername(email: $email){
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
  }
}`

export const searchRoomsQuery = gql`
query searchRooms($cursor: String, $limit: Int, $search: String!){
  searchRooms(cursor: $cursor, limit: $limit, search: $search) {
    id
    name
    cover
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
        }
      id
      tags
      comment
      }
  }
}
`
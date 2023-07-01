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
  }
}`

export const searchRoomsQuery = gql`
query searchRooms($search: String!){
  searchRooms(search: $search) {
    id
    name
    cover
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
      objectPosition
      cover
      likes {
        id
      }
      dislikes {
        id
      }
      createdAt
  }
}`

// export const roomsCursoredQuery = gql`
// query roomsCursored($cursor: ID, $limit: Int){
//   roomsCursored(cursor: $cursor,limit: $limit) {
//     cursor
//     rooms{
//       id
//       name
//       tv {
//         image {
//           url
//         }
//       }
//       objectPosition
//       cover
//       likes {
//         id
//       }
//       dislikes {
//         id
//       }
//   }
// }}`
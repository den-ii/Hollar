import { useMutation } from '@vue/apollo-composable'
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from './Apollo'
import gql from 'graphql-tag'


export const { mutate: verifyUser, error: verifyUserError } = provideApolloClient(apolloClient)(() => useMutation(gql`
    mutation verifyUser ($token: String!){
      verifyUser(token: $token) {
        message
        code
      }
    }
  `)
)



export const { mutate: tryCreateUserWithEmail, error: tryCreateUserWithEmailError, loading: tryCreateUserLoading } = provideApolloClient(apolloClient)(() => useMutation(gql`
    mutation tryCreateUserWithEmail ($user: createAUser){
      tryCreateUserWithEmail(user: $user) {
        message
        code
      }
    }
  `))
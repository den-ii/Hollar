import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed
} from '@vee-validate/rules'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { invalidUsernameQuery, invalidEmailQuery } from '@/graphql/queries'
import { apolloClient } from '@/Apollo'

export const VeeValidatePlugin = {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('maxVal', maxVal)
    defineRule('minVal', minVal)
    defineRule('email', email)
    defineRule('passwords_mismatch', confirmed)
    defineRule('alphaSpaces', alphaSpaces)
    defineRule('minLength', (value, [limit]) => {
      // The field is empty so it should pass
      if (!value || !value.length) return true
      if (value < limit) {
        return `This field must be at least ${limit} characters`
      }

      return true
    })
    defineRule('usernameAval', async (value) => {
      const { result } = await provideApolloClient(apolloClient)(() =>
        useQuery(invalidUsernameQuery, { username: value.toLowerCase() })
      )
      if (!value || !value.length) {
        return true
      }
      if (!result.value) {
        return `username unavailable`
      }
      return true
    })
    defineRule('emailAval', async (value) => {
      const { result } = await provideApolloClient(apolloClient)(() =>
        useQuery(invalidEmailQuery, { email: value.toLowerCase() })
      )
      if (!value || !value.length) {
        return true
      }
      if (!result.value) {
        return `email already in use`
      }
      return true
    })

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alphaSpaces: `can only have alphabets and spaces.`,
          min_value: `You are underage.`,
          max_value: `You are too old.`,
          passwords_mismatch: `The passwords don't match.`,
          tos: `You must accept Terms of Service.`
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
        return message
      }
    })
  }
}

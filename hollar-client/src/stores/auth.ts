import { ref, type Ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';



export const useAuthStore = defineStore('auth', () => {
    const isAuth = ref(localStorage.getItem('token') ? true : false)
    const authModal = ref(false)
    const token = ref(localStorage.getItem('token') || null)
    const user: any = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null)

    // dp function
    const name = ref(getName())
    watch(user, () => {
        name.value = getName()
    })
    // dp background function
    const authBg = computed(() => (user.value?.avatar ? '' : `bg-gray-500`))

    function getName() {
        if (user.value) {
            const defaultDisplayName = user.value?.fullName.split(' ')
            return defaultDisplayName[0]?.charAt(0).toUpperCase() + defaultDisplayName[1]?.charAt(0).toUpperCase()
        }
        return ''
    }

    // login function
    function login(luser) {
        isAuth.value = true
        token.value = luser.token
        user.value = luser.user
        authModal.value = false
        localStorage.setItem('token', luser.token)
        localStorage.setItem('user', JSON.stringify(luser.user))
    }
    //logout function 
    function logout() {
        isAuth.value = false
        token.value = null
        user.value = null
        localStorage.clear()
    }
    // logout()
    return { isAuth, authModal, login, logout, token, user, name, authBg }
})
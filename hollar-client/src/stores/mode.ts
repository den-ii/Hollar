import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

export const useModeStore = defineStore('mode', () => {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)


    return { isDark, toggleDark }
})

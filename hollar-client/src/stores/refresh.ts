import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRefreshStore = defineStore('counter', () => {
    const home = ref(0)
    function homeInc() {
        home.value++
    }

    return { home, homeInc }
})

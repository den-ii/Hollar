import { ref, type Ref, computed } from 'vue';
import { defineStore } from 'pinia';



export const useModalStore = defineStore('modals', () => {

    const postModal = ref(false)

    return { postModal }
})
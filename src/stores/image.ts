import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Image } from "../interfaces";

export const useImageStore = defineStore('image', () => {
    const isOpen = ref(false)
    const image = ref({} as Image)
    const imageUrl = ref('')
    const imagePrompt = ref('')

    function close() {
        isOpen.value = false
        image.value = {} as Image
    }
    return { isOpen, image, imageUrl, imagePrompt, close}
})

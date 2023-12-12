import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Image, ImageParameters } from "../interfaces";

export const useImageStore = defineStore('image', () => {
    const isOpen = ref(false)
    const image = ref({} as Image)
    const imageUrl = ref('')
    const imageParameters = ref({} as ImageParameters)

    function close() {
        isOpen.value = false
        image.value = {} as Image
    }
    return { isOpen, image, imageUrl, imageParameters, close}
})

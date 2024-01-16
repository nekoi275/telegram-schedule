import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Post, Image, ImageParameters } from "../interfaces"

export const useImageStore = defineStore('image', () => {
    const isOpen = ref(false)
    const image = ref({} as Image)
    const imageUrl = ref('')
    const imagePost = ref({} as Post)
    const imageIndex = ref(0)
    const imageParameters = ref({} as ImageParameters)
    const hasNext = ref(true)
    const hasPrev = ref(true)

    function close() {
        isOpen.value = false
        image.value = {} as Image
        imageUrl.value = ''
        imageParameters.value = {} as ImageParameters
        imagePost.value = {} as Post
        imageIndex.value = 0
    }
    return { isOpen, image, imageUrl, imageParameters, imagePost, imageIndex, hasNext, hasPrev, close}
})

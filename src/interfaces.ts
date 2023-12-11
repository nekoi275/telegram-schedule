interface post {
    images: Array<image>
    text: string
    target: object
    date: number
    id: string
}

interface image {
    name: string
    type: string
    size: number
    info: imageInfo
}

interface imageInfo {
    file: string
    size: Array<number>
    parameters: imageParameters
    tags: object
    nsfw: object
}

interface imageParameters {
    prompt: string
}

export type {
    post, image, imageInfo, imageParameters
}
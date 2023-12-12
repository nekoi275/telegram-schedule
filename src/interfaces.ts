interface Post {
    images: Array<Image>
    text: string
    target: Target
    date: number
    id: string
}

interface Image {
    name: string
    type: string
    size: number
    info: ImageInfo
}

interface ImageInfo {
    file: string
    size: Array<number>
    parameters: ImageParameters
    tags: object
    nsfw: object
}

interface ImageParameters {
    prompt: string
}

interface Target {
    group_id: number
    chat_id: number
    link: string
    name: string
}

export type {
    Post, Image, ImageInfo, ImageParameters
}
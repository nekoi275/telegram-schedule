<script setup lang="ts">
import InfoCard from "../components/InfoCard.vue"
import ImageModal from "../components/ImageModal.vue"
import type { Image, Post } from "../interfaces"
import { useImageStore } from "../stores/image"
import { useApiStore } from "../stores/api"
import { computed, onMounted, ref } from "vue"
const imageStore = useImageStore()
const api = useApiStore()
let posts = ref([] as Post[])
let groups = ref([])
let selectedGroup = ref("")
const filteredPosts = computed(() => {
  if (selectedGroup.value) {
    let filtered = posts.value.filter((post) => {
      return post.target.group_id == selectedGroup.value
    });
    return filtered || posts.value
  } else {
    return posts.value
  }
});

async function openImage(post: Post, image: Image, index: number) {
  const response = await api.getImage(
    api.getImageUrl(post.target.group_id, post.date, index)
  )
  if (response) {
    const objectUrl = URL.createObjectURL(response)
    imageStore.imageUrl = objectUrl
  }
  if (post.images[index + 1]) {
    imageStore.hasNext = true
  } else {
    imageStore.hasNext = false
  }
  if (post.images[index - 1]) {
    imageStore.hasPrev = true
  } else {
    imageStore.hasPrev = false
  }
  imageStore.imagePost = post
  imageStore.imageIndex = index
  imageStore.image = image
  imageStore.imageParameters = image.info.parameters
  imageStore.isOpen = true
}
async function changeImage(direction: string) {
  if (direction === 'next') {
    let image = imageStore.imagePost.images[imageStore.imageIndex + 1]
    openImage(imageStore.imagePost, image, imageStore.imageIndex + 1)
  } else {
    let image = imageStore.imagePost.images[imageStore.imageIndex - 1]
    openImage(imageStore.imagePost, image, imageStore.imageIndex - 1)
  }
}
function remove(groupId: any, date: number) {
  api.remove(groupId, date).then(() => {
    posts.value = posts.value.filter(
      (post) => post.date != date && post.target.group_id != groupId
    )
  })
}
onMounted(() => {
  api.get().then((response) => {
    posts.value = response.sort((a: Post, b: Post) => a.date - b.date)
  })
  api.getGroupsList().then((response) => (groups.value = response))
})
</script>

<template>
  <nav>
    <Multi-select
      mode="single"
      :options="groups"
      v-model="selectedGroup"
    ></Multi-select>
    <V-icon
      class="logout"
      name="io-exit-outline"
      scale="1.5"
      animation="wrench"
      @click="api.logout"
      hover
    ></V-icon>
  </nav>
  <div class="wrapper">
    <main>
      <InfoCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="(post as unknown as Post)"
        @openImage="openImage"
        @remove="remove"
      ></InfoCard>
    </main>
  </div>
  <ImageModal @changeImage="changeImage"></ImageModal>
</template>

<style scoped>
nav {
  width: 100%;
  height: 70px;
  background-color: var(--main-dark-color);
  color: var(--main-light-color);
  position: fixed;
  z-index: 1;
}
button {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 14px;
  right: 15px;
  padding: 0px;
}
.multiselect {
  width: 500px;
  position: absolute;
  left: 20px;
  top: 14px;
  color: var(--text-dark-color);
}
.logout {
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: var(--main-light-color);
  border-radius: 3px;
  padding: 5px;
}
</style>

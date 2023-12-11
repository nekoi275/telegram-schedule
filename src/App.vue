<script setup lang="ts">
import InfoCard from "./components/InfoCard.vue";
import ImageModal from "./components/ImageModal.vue";
import posts from "./assets/posts-data.json";
import type { image, post } from "./interfaces";
import { ref } from "vue";

let isImageOpen = ref(false)
let openedImage = ref({} as image)

function openImage(post: post, imageName: string) {
  openedImage.value = post.images.filter(img => img.name = imageName)[0]
  isImageOpen.value = true
}
</script>

<template>
  <nav>
    <Multi-select mode="tags"></Multi-select>
    <button><V-icon name="bi-plus-square"></V-icon></button>
  </nav>
  <div class="wrapper">
    <main>
      <InfoCard v-for="post in posts" :key="post.id" :post="post" @openImage="openImage"></InfoCard>
    </main>
  </div>
  <ImageModal :isOpen="isImageOpen" :image="openedImage" @close="isImageOpen = false"></ImageModal>
</template>

<style scoped>
nav {
  width: 100%;
  height: 70px;
  background-color: var(--main-dark-color);
  color: var(--main-light-color);
  position: fixed;
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
  width: 150px;
  position: absolute;
  left: 20px;
  top: 14px;
}
</style>

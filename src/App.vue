<script setup lang="ts">
import InfoCard from "./components/InfoCard.vue";
import ImageModal from "./components/ImageModal.vue";
//import posts from "./assets/posts-data.json";
import type { Image, Post } from "./interfaces";
import { useImageStore } from "./stores/image";
import { useApiStore } from "./stores/api";
import { onMounted, ref } from "vue";
const imageStore = useImageStore();
const api = useApiStore();
let posts = ref([] as Post[])

function openImage(post: Post, image: Image, index: number) {
  imageStore.image = image;
  imageStore.isOpen = true;
  imageStore.imageUrl = api.getImageUrl(post.target.group_id, post.date, index);
  imageStore.imageParameters = image.info.parameters
}
onMounted(() => {
  api.get().then(response => posts.value = response);
});
</script>

<template>
  <nav>
    <Multi-select mode="tags"></Multi-select>
    <button><V-icon name="bi-plus-square"></V-icon></button>
  </nav>
  <div class="wrapper">
    <main>
      <InfoCard
        v-for="post in posts"
        :key="post.id"
        :post="(post as unknown as Post)"
        @openImage="openImage"
      ></InfoCard>
    </main>
  </div>
  <ImageModal></ImageModal>
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
  width: 150px;
  position: absolute;
  left: 20px;
  top: 14px;
}
</style>

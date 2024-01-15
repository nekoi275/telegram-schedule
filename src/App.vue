<script setup lang="ts">
import InfoCard from "./components/InfoCard.vue";
import ImageModal from "./components/ImageModal.vue";
import type { Image, Post } from "./interfaces";
import { useImageStore } from "./stores/image";
import { useApiStore } from "./stores/api";
import { computed, onMounted, ref } from "vue";
const imageStore = useImageStore();
const api = useApiStore();
let posts = ref([] as Post[]);
let groups = ref([]);
let selectedGroup = ref("");
const filteredPosts = computed(() => {
  if (selectedGroup.value) {
    let filtered = posts.value.filter((post) => {
      return post.target.group_id == selectedGroup.value
    })
    return filtered || posts.value
  } else {
    return posts.value
  }
})

async function openImage(post: Post, image: Image, index: number) {
  const response = await api.getImage(
    api.getImageUrl(post.target.group_id, post.date, index)
  )
  if (response) {
    const objectUrl = URL.createObjectURL(response)
    imageStore.imageUrl = objectUrl
  }
  imageStore.image = image
  imageStore.imageParameters = image.info.parameters
  imageStore.isOpen = true
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
  });
  api.getGroupsList().then((response) => (groups.value = response))
});
</script>

<template>
  <nav>
    <Multi-select
      mode="single"
      :options="groups"
      v-model="selectedGroup"
    ></Multi-select>
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
  width: 500px;
  position: absolute;
  left: 20px;
  top: 14px;
  color: var(--text-dark-color);
}
</style>

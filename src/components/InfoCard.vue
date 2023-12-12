<script setup lang="ts">
import type { Post } from "../interfaces";

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div class="card">
    <p>Tags: {{ post.text }}</p>
    <span>Date: {{ post.date }}</span>
    <V-icon name="bi-trash-fill" class="trash-icon"></V-icon>
    <div class="images-container">
      <V-icon
        class="image-icon"
        name="bi-card-image"
        v-for="image, index in post.images"
        :key="image.name"
        :title="image.name"
        @click="$emit('openImage', post, image, index)"
      ></V-icon>
    </div>
  </div>
</template>

<style scoped>
.ov-icon {
  cursor: pointer;
}
.card {
  max-width: 800px;
  position: relative;
  padding: 15px;
  margin: auto;
  background-color: var(--main-light-color);
  border-radius: 3px;
  margin-bottom: 20px;
}
.trash-icon {
  position: absolute;
  top: 15px;
  right: 15px;
}
.images-container {
  text-align: center;
}
.image-icon {
  margin-right: 20px;
}
</style>

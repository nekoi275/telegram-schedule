<script setup lang="ts">
import type { Post } from "../interfaces";
import markdownit from 'markdown-it'
const md = markdownit()

defineProps<{
  post: Post
}>();
</script>

<template>
  <div class="card">
    <p v-html="md.render(post.text)"></p>
    <span>Date: {{ new Date(post.date) }}</span>
    <V-icon name="bi-trash-fill" class="trash-icon" @click="$emit('remove', post.target.group_id, post.date)"></V-icon>
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
p, span{
  display: inline;
}
</style>

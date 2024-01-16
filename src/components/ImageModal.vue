<script setup lang="ts">
import { useImageStore } from "../stores/image"
const imageStore = useImageStore()

function formatParams() {
  let params = {...imageStore.imageParameters}
  delete params.prompt
  delete params.negative
  return params
}
</script>

<template>
  <div class="container" v-show="imageStore.isOpen">
    <div class="overlay" @click="imageStore.isOpen = false"></div>
    <V-icon
      class="arrow-left"
      name="bi-arrow-left-square"
      scale="2"
      @click="$emit('changeImage', 'prev')"
      stroke="#CDC8C2"
      v-show="imageStore.hasPrev"
    ></V-icon>
    <V-icon
      class="arrow-right"
      name="bi-arrow-right-square"
      scale="2"
      @click="$emit('changeImage', 'next')"
      stroke="#CDC8C2"
      v-show="imageStore.hasNext"
    ></V-icon>
    <div class="modal">
      <img :src="imageStore.imageUrl"/>
      <table>
        <tbody>
          <tr>
            <td>Prompt</td>
            <td>{{ imageStore.imageParameters.prompt }}</td>
          </tr>
          <tr>
            <td>Negative</td>
            <td>{{ imageStore.imageParameters.negative }}</td>
          </tr>
          <tr
            v-for="[key, value] in Object.entries(formatParams())"
          >
            <td>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
.container .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.container .modal {
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  background-color: var(--text-light-color);
  border-radius: 3px;
  padding: 20px;
  text-align: center;
  font-size: 10px;
  max-height: 700px;
}
img {
  max-width: 800px;
  max-height: 350px;
}
table {
  text-align: left;
  border-collapse: collapse;
}
table tbody {
  overflow-y: scroll;
  max-height: 300px;
  display: block;
}
table tr td {
  border: 1px solid;
  padding-left: 10px;
}
tbody tr td:first-child {
  width: 100px;
  padding-right: 10px;
}
.arrow-left {
  position: absolute;
  top: 50%;
  left: 80px;
  cursor: pointer;
}
.arrow-right {
  position: absolute;
  top: 50%;
  right: 80px;
  cursor: pointer;
}
</style>

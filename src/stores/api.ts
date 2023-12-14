import { defineStore } from "pinia";
import { computed } from "vue";
import type { Post } from "../interfaces";

export const useApiStore = defineStore("api", () => {
  const baseUrl = "https://telegraf-worker-api.denias.workers.dev";
  const userName = "denis";
  const password = "Zvw9zXvg";
  const requestConfig = computed(() => {
    return {
      headers: {
        Authorization: `Basic ${btoa(`${userName}:${password}`)}`,
      },
    };
  });
  function get() {
    return fetch(`${baseUrl}/api/posts`, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(
          "getting error.Status: " + response.statusText + " " + response.text
        );
      }
    });
  }
  function create(data: Post) {
    return fetch(`${baseUrl}/api/posts`, {
      ...requestConfig.value,
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(
          "getting error.Status: " + response.statusText + " " + response.text
        );
      }
    });
  }
  function getImageUrl(groupId: any, date: number, index: number) {
    return new URL(
      `${baseUrl}/image?groupid=${groupId}&date=${date}&id=${index}`,
      import.meta.url
    ).href;
  }
  function getImage(imageUrl: string) {
    return fetch(imageUrl, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.blob()
      } else {
        console.error(
          "getting error.Status: " + response.statusText + " " + response.text
        );
      }
    });
  }
  function getGroupsList() {
    return fetch(`${baseUrl}/api/groups`, requestConfig.value).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error(
          "getting error.Status: " + response.statusText + " " + response.text
        );
      }
    });
  }
  function remove(groupId: any, date: number) {
    return fetch(`${baseUrl}/api/post?groupid=${groupId}&date=${date}`, {
      ...requestConfig.value,
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        return response
      } else {
        console.error('getting error.Status: ' + response.statusText + ' ' + response.text)
      }
    })
  }
  return {
    get,
    create,
    getImageUrl,
    getImage,
    getGroupsList,
    remove
  };
});

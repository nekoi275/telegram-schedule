import { defineStore } from "pinia"
import { computed, ref } from "vue"
import type { Post } from "../interfaces"
import router from "../router"

export const useApiStore = defineStore("api", () => {
  const baseUrl = "https://telegraf-worker-api.denias.workers.dev"
  const userName = ref('')
  const password = ref('')
  const isLoggedIn = ref(false)
  const isWrongCreds = ref(false)
  const requestConfig = computed(() => {
    return {
      headers: {
        Authorization: `Basic ${btoa(
          `${userName.value || localStorage.getItem('telegram-schedule-user')}:${
            password.value || localStorage.getItem('telegram-schedule-pass')
          }`
        )}`
      },
    };
  });
  function login() {
    return fetch(baseUrl, requestConfig.value).then((response) => {
      if (response.status !== 401) {
        isLoggedIn.value = true
        isWrongCreds.value = false
        localStorage.setItem('telegram-schedule-user', userName.value)
        localStorage.setItem('telegram-schedule-pass', password.value)
        router.push('/')
        return `Successfully logged in`
      } else {
        isWrongCreds.value = true
        console.error('getting error.Status: ' + response.status)
      }
    })
  }
  function logout() {
    isLoggedIn.value = false
    localStorage.removeItem('telegram-schedule-user')
    localStorage.removeItem('telegram-schedule-pass')
    userName.value = ''
    password.value = ''
    router.push('/login')
  }
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
  function edit(data: Post, groupId: any, date: number) {
    return fetch(`${baseUrl}/api/post?groupid=${groupId}&date=${date}`, {
      ...requestConfig.value,
      method: "PUT",
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
  return {
    isLoggedIn,
    isWrongCreds,
    userName,
    password,
    login,
    logout,
    get,
    create,
    getImageUrl,
    getImage,
    getGroupsList,
    remove,
    edit
  };
});

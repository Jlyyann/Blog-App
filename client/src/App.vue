<script setup>
import { onBeforeMount } from 'vue'
import Navbar from './components/Navbar.vue'
import { useGlobalStore } from './stores/global'

const store = useGlobalStore()

onBeforeMount(async () => {
  if (store.user.token) {
    try {
      await store.getUserDetails(store.user.token)
    } catch (error) {
      store.clearUser()
    }
  }
})
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>

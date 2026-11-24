<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../stores/global'

const router = useRouter()
const { clearUser } = useGlobalStore()

onBeforeMount(() => {
  clearUser()
  router.push({ path: '/' })
})
</script>

<template>
  <div></div>
</template>

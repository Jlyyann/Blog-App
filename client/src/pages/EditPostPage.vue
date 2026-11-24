<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const title = ref('')
const content = ref('')
const category = ref('Personal journal')
const isEnabled = ref(false)
const route = useRoute()
const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()
const categories = ['Personal journal', 'Food and recipes', 'Travel', 'Photography', 'Business and news', 'Creative writing', 'Podcast']

watch([title, content], (currentValue, oldValue) => {
  if (currentValue.every(input => input.trim() !== '')) {
    isEnabled.value = true
  } else {
    isEnabled.value = false
  }
})

async function getPost() {
  try {
    let response = await api.get(`/posts/${route.params.id}`)
    if (response.data.authorId !== store.user.id) {
      router.push({ path: '/posts' })
      return
    }
    title.value = response.data.title
    content.value = response.data.content
    category.value = response.data.category || 'Personal journal'
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Unable to load post')
    }
    router.push({ path: '/posts' })
  }
}

async function handleSubmit() {
  if (title.value.trim() === '' || content.value.trim() === '') {
    notyf.error('Title and content are required')
    return
  }

  try {
    let response = await api.patch(`/posts/${route.params.id}`, {
      title: title.value.trim(),
      content: content.value.trim(),
      category: category.value
    })

    if (response.status === 200) {
      notyf.success(response.data.message)
      router.push({ path: '/posts' })
    }
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Error updating post. Please contact administrator.')
    }
  }
}

onBeforeMount(async () => {
  if (!store.user.token) {
    router.push({ path: '/login' })
    return
  }
  try {
    if (!store.user.id) await store.getUserDetails(store.user.token)
    await getPost()
  } catch (error) {
    store.clearUser()
    router.push({ path: '/login' })
  }
})
</script>

<template>
  <section class="container form-page">
    <div class="page-heading"><p class="eyebrow">Your story</p><h1>Edit post.</h1><p>Update your title or content below.</p></div>
    <form class="post-form" v-on:submit.prevent="handleSubmit">
      <fieldset class="topic-picker">
        <legend>What kind of post is this?</legend>
        <div class="topic-options">
          <label v-for="item in categories" :key="item" class="topic-option" :class="{ selected: category === item }">
            <input v-model="category" type="radio" name="category" :value="item" />
            <span>{{ item }}</span>
          </label>
        </div>
      </fieldset>
      <div class="mb-3"><label class="form-label">Title</label><input v-model="title" class="form-control" required /></div>
      <div class="mb-4"><label class="form-label">Content</label><textarea v-model="content" class="form-control" rows="10" required></textarea></div>
      <button class="btn btn-primary" :disabled="!isEnabled">Save Changes</button>
    </form>
  </section>
</template>

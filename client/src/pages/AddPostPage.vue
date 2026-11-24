<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const title = ref('')
const content = ref('')
const isEnabled = ref(false)
const categories = ['Personal journal', 'Food and recipes', 'Travel', 'Photography', 'Business and news', 'Creative writing', 'Podcast']
const route = useRoute()
const router = useRouter()
const notyf = new Notyf()
const { user } = useGlobalStore()
const category = ref(categories.includes(route.query.category) ? route.query.category : 'Personal journal')

watch([title, content], (currentValue, oldValue) => {
  if (currentValue.every(input => input.trim() !== '')) {
    isEnabled.value = true
  } else {
    isEnabled.value = false
  }
})

async function handleSubmit() {
  if (title.value.trim() === '' || content.value.trim() === '') {
    notyf.error('Title and content are required')
    return
  }

  try {
    let response = await api.post('/posts', {
      title: title.value.trim(),
      content: content.value.trim(),
      category: category.value
    })

    if (response.status === 201) {
      notyf.success(response.data.message)
      router.push({ path: '/posts' })
    }
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Error adding post. Please contact administrator.')
    }
  }
}

onBeforeMount(() => { if (!user.token) router.push({ path: '/login' }) })
</script>

<template>
  <section class="container form-page">
    <div class="page-heading"><p class="eyebrow">New story</p><h1>Write a post.</h1><p>Share an idea with the community.</p></div>
    <form class="post-form" v-on:submit.prevent="handleSubmit">
      <fieldset class="topic-picker">
        <legend>What kind of post do you want to create?</legend>
        <div class="topic-options">
          <label v-for="item in categories" :key="item" class="topic-option" :class="{ selected: category === item }">
            <input v-model="category" type="radio" name="category" :value="item" />
            <span>{{ item }}</span>
          </label>
        </div>
      </fieldset>
      <div class="mb-3"><label class="form-label">Title</label><input v-model="title" class="form-control" required /></div>
      <div class="mb-4"><label class="form-label">Content</label><textarea v-model="content" class="form-control" rows="10" required></textarea></div>
      <button class="btn btn-primary" :disabled="!isEnabled">Publish Post</button>
    </form>
  </section>
</template>

<script setup>
import { computed, ref, onBeforeMount, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
import PostCard from '../components/PostCard.vue'

const posts = ref([])
const errorMessage = ref('')
const route = useRoute()
const categories = ['Personal journal', 'Food and recipes', 'Travel', 'Photography', 'Business and news', 'Creative writing', 'Podcast']
const selectedCategory = computed(() => categories.includes(route.query.category) ? route.query.category : '')

async function getPosts() {
  try {
    errorMessage.value = ''
    let response = await api.get('/posts', {
      params: selectedCategory.value ? { category: selectedCategory.value } : {},
    })
    posts.value = response.data
  } catch (error) {
    errorMessage.value = 'Unable to load posts. Make sure the server is running.'
  }
}

onBeforeMount(() => getPosts())
watch(selectedCategory, () => getPosts())
</script>

<template>
  <section class="container section-space posts-page">
    <div class="page-heading">
      <p class="eyebrow">Public archive</p>
      <h1>{{ selectedCategory || 'All posts' }}</h1>
      <p v-if="selectedCategory">Stories published under {{ selectedCategory }}.</p>
      <p v-else>Browse every story shared by the community.</p>
    </div>
    <nav class="post-topic-filters" aria-label="Filter posts by topic">
      <RouterLink class="post-topic-filter" :class="{ selected: !selectedCategory }" to="/posts">All posts</RouterLink>
      <RouterLink
        v-for="category in categories"
        :key="category"
        class="post-topic-filter"
        :class="{ selected: selectedCategory === category }"
        :to="{ path: '/posts', query: { category } }"
      >
        {{ category }}
      </RouterLink>
    </nav>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-else-if="posts.length === 0" class="empty-state">No posts found{{ selectedCategory ? ` in ${selectedCategory}` : '' }}.</div>
    <PostCard v-for="post in posts" :key="post._id" :post="post" />
  </section>
</template>

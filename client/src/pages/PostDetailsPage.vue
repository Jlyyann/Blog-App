<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import CommentForm from '../components/CommentForm.vue'
import { useGlobalStore } from '../stores/global'

const post = ref(null)
const errorMessage = ref('')
const route = useRoute()
const router = useRouter()
const notyf = new Notyf()
const { user } = useGlobalStore()

function formatDate(date) { return new Date(date).toLocaleDateString() }

async function getPost() {
  try {
    let response = await api.get(`/posts/${route.params.id}`)
    post.value = response.data
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'Unable to load this post.'
    }
  }
}

async function deletePost() {
  if (!confirm('Delete this post?')) return
  try {
    await api.delete(`/posts/${route.params.id}`)
    notyf.success('Post deleted')
    router.push({ path: '/posts' })
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Unable to delete post')
    }
  }
}

onBeforeMount(() => getPost())
</script>

<template>
  <section class="container article-page">
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <article v-if="post" class="article-content">
      <RouterLink to="/posts" class="back-link"><i class="bi bi-arrow-left"></i> All posts</RouterLink>
      <p class="eyebrow">{{ post.category || 'Personal journal' }} · Written by @{{ post.authorUsername }}</p>
      <h1>{{ post.title }}</h1>
      <p class="article-date">Published {{ formatDate(post.createdOn) }}</p>
      <p class="article-body">{{ post.content }}</p>
      <div v-if="user.id === post.authorId || user.isAdmin === true" class="article-actions">
        <RouterLink v-if="user.id === post.authorId" :to="`/editPost/${post._id}`" class="btn btn-outline-dark">Edit</RouterLink>
        <button class="btn btn-danger" @click="deletePost">Delete</button>
      </div>
    </article>
    <section v-if="post" class="comments-section">
      <h2>Comments</h2>
      <CommentForm v-if="user.token" :post-id="post._id" @comment-added="getPost" />
      <p v-else class="comment-login"><RouterLink to="/login">Log in</RouterLink> to add a comment.</p>
      <div v-if="post.comments.length === 0" class="empty-state">No comments yet.</div>
      <div v-for="item in post.comments" :key="item._id" class="comment-item">
        <div><strong>@{{ item.username }}</strong><span>{{ formatDate(item.createdOn) }}</span></div>
        <p>{{ item.comment }}</p>
      </div>
    </section>
  </section>
</template>

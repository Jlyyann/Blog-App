<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const posts = ref([])
const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

function formatDate(date) { return new Date(date).toLocaleDateString() }

async function getPosts() {
  try {
    let response = await api.get('/posts')
    posts.value = response.data
  } catch (error) {
    notyf.error('Unable to load posts')
  }
}

async function deletePost(id) {
  if (!confirm('Delete this post?')) return
  try {
    await api.delete(`/posts/${id}`)
    notyf.success('Post deleted')
    await getPosts()
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Unable to delete post')
    }
  }
}

onBeforeMount(async () => {
  try {
    if (!store.user.token) {
      router.push({ path: '/login' })
      return
    }
    if (!store.user.id) await store.getUserDetails(store.user.token)
    if (store.user.isAdmin !== true) {
      router.push({ path: '/posts' })
      return
    }
    await getPosts()
  } catch (error) {
    store.clearUser()
    router.push({ path: '/login' })
  }
})
</script>

<template>
  <section class="container section-space">
    <div class="page-heading"><p class="eyebrow">Admin only</p><h1>Manage posts.</h1><p>View and remove posts from the blog.</p></div>
    <div class="table-responsive admin-table">
      <table class="table align-middle">
        <thead><tr><th>Title</th><th>Author</th><th>Date</th><th>Action</th></tr></thead>
        <tbody>
          <tr v-for="post in posts" :key="post._id">
            <td><RouterLink :to="`/posts/${post._id}`">{{ post.title }}</RouterLink></td>
            <td>@{{ post.authorUsername }}</td>
            <td>{{ formatDate(post.createdOn) }}</td>
            <td><button class="btn btn-sm btn-danger" @click="deletePost(post._id)">Delete</button></td>
          </tr>
          <tr v-if="posts.length === 0"><td colspan="4">No posts available.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

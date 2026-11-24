<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const password = ref('')
const isEnabled = ref(false)
const router = useRouter()
const notyf = new Notyf()
const store = useGlobalStore()

watch([email, password], (values) => {
  isEnabled.value = values.every((value) => value !== '')
})

async function handleSubmit() {
  try {
    const response = await api.post('/users/login', {
      email: email.value.trim(),
      password: password.value,
    })
    store.setToken(response.data.access)
    await store.getUserDetails(response.data.access)
    notyf.success('Login successful')
    router.push({ path: '/' })
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Login failed. Please contact administrator.')
    }
  }
}

onBeforeMount(() => {
  if (store.user.token) router.push({ path: '/' })
})
</script>

<template>
  <section class="auth-page">
    <div class="auth-copy">
      <div class="auth-copy-inner">
        <p class="auth-brand">StoryNest</p>
        <p class="eyebrow">Welcome back</p>
        <h1>Continue your story.</h1>
        <p class="auth-description">Sign in to publish your ideas, manage your posts, and join the conversation.</p>
        <div class="auth-message">
          <i class="bi bi-quote"></i>
          <span>Every good story begins with a thought worth sharing.</span>
        </div>
      </div>
    </div>
    <div class="auth-form-area">
      <form class="auth-form" v-on:submit.prevent="handleSubmit">
        <p class="eyebrow">Member access</p>
        <h2>Sign in to your account</h2>
        <p class="form-intro">Enter your account details below.</p>

        <div class="auth-field">
          <label for="loginEmail" class="form-label">Email address</label>
          <input id="loginEmail" v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
        </div>
        <div class="auth-field">
          <label for="loginPassword" class="form-label">Password</label>
          <input id="loginPassword" v-model="password" type="password" class="form-control" placeholder="Enter your password" required />
        </div>
        <button class="btn btn-primary w-100 auth-button" :disabled="!isEnabled">Sign In</button>
        <p class="auth-switch">New to StoryNest? <RouterLink to="/register">Create an account</RouterLink></p>
      </form>
    </div>
  </section>
</template>

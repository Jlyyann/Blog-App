<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'
import { useGlobalStore } from '../stores/global'

const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const isEnabled = ref(false)
const router = useRouter()
const notyf = new Notyf()
const { user } = useGlobalStore()

watch([email, username, password, confirmPassword], (values) => {
  isEnabled.value = values.every((value) => value !== '') && password.value.length >= 8 && password.value === confirmPassword.value
})

async function handleSubmit() {
  try {
    const response = await api.post('/users/register', {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value,
    })
    notyf.success(response.data.message)
    router.push({ path: '/login' })
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Registration failed. Please contact administrator.')
    }
  }
}

onBeforeMount(() => {
  if (user.token) router.push({ path: '/' })
})
</script>

<template>
  <section class="auth-page">
    <div class="auth-copy">
      <div class="auth-copy-inner">
        <p class="auth-brand">StoryNest</p>
        <p class="eyebrow">Join the conversation</p>
        <h1>Make your ideas heard.</h1>
        <p class="auth-description">Create an account and start sharing stories with readers in the community.</p>
        <div class="auth-message">
          <i class="bi bi-pencil"></i>
          <span>Write freely. Share thoughtfully. Connect through stories.</span>
        </div>
      </div>
    </div>
    <div class="auth-form-area">
      <form class="auth-form" v-on:submit.prevent="handleSubmit">
        <p class="eyebrow">Create an account</p>
        <h2>Start writing today</h2>
        <p class="form-intro">Complete the form to join StoryNest.</p>

        <div class="auth-field">
          <label for="registerEmail" class="form-label">Email address</label>
          <input id="registerEmail" v-model="email" type="email" class="form-control" placeholder="name@example.com" required />
        </div>
        <div class="auth-field">
          <label for="registerUsername" class="form-label">Username</label>
          <input id="registerUsername" v-model="username" class="form-control" placeholder="Choose a username" required />
        </div>
        <div class="auth-field">
          <label for="registerPassword" class="form-label">Password</label>
          <input id="registerPassword" v-model="password" type="password" class="form-control" placeholder="At least 8 characters" required />
        </div>
        <div class="auth-field">
          <label for="confirmPassword" class="form-label">Confirm password</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" class="form-control" placeholder="Enter your password again" required />
        </div>
        <button class="btn btn-primary w-100 auth-button" :disabled="!isEnabled">Create Account</button>
        <p class="auth-switch">Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
      </form>
    </div>
  </section>
</template>

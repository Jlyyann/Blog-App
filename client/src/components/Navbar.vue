<script setup>
import { useGlobalStore } from '../stores/global'

const { user } = useGlobalStore()
</script>

<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container nav-shell">
      <RouterLink class="navbar-brand" to="/">
        <img class="brand-logo" src="/blog.png" alt="" />
        <span>StoryNest</span>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#blogNavbar" aria-controls="blogNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="blogNavbar" class="collapse navbar-collapse">
        <div class="navbar-nav nav-main align-items-lg-center">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/posts">Posts</RouterLink>
          <RouterLink v-if="user.token" class="nav-link" to="/addPost">Write</RouterLink>
          <RouterLink v-if="user.isAdmin === true" class="nav-link" to="/admin">Admin</RouterLink>
        </div>
        <div class="navbar-nav nav-account align-items-lg-center">
          <RouterLink v-if="!user.token" class="nav-link" to="/login">Login</RouterLink>
          <RouterLink v-if="!user.token" class="btn btn-primary nav-cta" to="/register">Get started</RouterLink>
          <RouterLink v-if="user.token" class="nav-link d-lg-none" to="/logout">Logout</RouterLink>
          <div v-if="user.token" class="dropdown d-none d-lg-block ms-lg-3">
            <button
              class="profile-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Open user menu"
            >
              <span class="profile-circle"><i class="bi bi-person-fill"></i></span>
              <span class="profile-label">@{{ user.username }}</span>
              <i class="bi bi-chevron-down profile-arrow"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end profile-menu">
              <li>
                <RouterLink class="dropdown-item" to="/logout">
                  <i class="bi bi-box-arrow-right me-2"></i>Logout
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

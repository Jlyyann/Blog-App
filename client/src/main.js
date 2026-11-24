import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'notyf/notyf.min.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomePage from './pages/HomePage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import LoginPage from './pages/LoginPage.vue'
import LogoutPage from './pages/LogoutPage.vue'
import PostsPage from './pages/PostsPage.vue'
import PostDetailsPage from './pages/PostDetailsPage.vue'
import AddPostPage from './pages/AddPostPage.vue'
import EditPostPage from './pages/EditPostPage.vue'
import AdminPage from './pages/AdminPage.vue'
import ErrorPage from './pages/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/logout', name: 'Logout', component: LogoutPage },
    { path: '/posts', name: 'Posts', component: PostsPage },
    { path: '/posts/:id', name: 'PostDetails', component: PostDetailsPage },
    { path: '/addPost', name: 'AddPost', component: AddPostPage },
    { path: '/editPost/:id', name: 'EditPost', component: EditPostPage },
    { path: '/admin', name: 'Admin', component: AdminPage },
    { path: '/:catchAll(.*)', name: 'NotFound', component: ErrorPage },
  ],
})

createApp(App).use(createPinia()).use(router).mount('#app')

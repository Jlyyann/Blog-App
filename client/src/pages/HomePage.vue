<script setup>
import { ref } from 'vue'

const categories = ['Personal journal', 'Food and recipes', 'Travel', 'Photography', 'Business and news', 'Creative writing', 'Podcast']
const selectedCategory = ref('Personal journal')
const categoryPosts = {
  'Personal journal': [
    { title: 'Finding Calm in Everyday Moments', author: 'Maya Collins', date: '2026-11-24T08:30:00', image: '/images/categories/personal-1.jpg' },
    { title: 'Notes From a Life in Progress', author: 'Liam Brooks', date: '2026-11-23T18:15:00', image: '/images/categories/personal-2.jpg' },
    { title: 'Small Habits, Meaningful Days', author: 'Sofia Reyes', date: '2026-11-22T09:45:00', image: '/images/categories/personal-3.jpg' },
  ],
  'Food and recipes': [
    { title: 'A Table Made for Sharing', author: 'Nina Patel', date: '2026-11-24T11:20:00', image: '/images/categories/food-1.jpg' },
    { title: 'Fresh Bowls for Busy Days', author: 'Ethan Cruz', date: '2026-11-23T12:05:00', image: '/images/categories/food-2.jpg' },
    { title: 'Homemade Pizza Night', author: 'Amelia Grant', date: '2026-11-21T19:30:00', image: '/images/categories/food-3.jpg' },
  ],
  Travel: [
    { title: 'Finding Wonder Close to Home', author: 'Noah Bennett', date: '2026-11-24T07:10:00', image: '/images/categories/travel-1.jpg' },
    { title: 'Between Mountains and Open Roads', author: 'Chloe Martin', date: '2026-11-22T16:40:00', image: '/images/categories/travel-2.jpg' },
    { title: 'The Journey Is the Destination', author: 'Lucas Rivera', date: '2026-11-20T10:25:00', image: '/images/categories/travel-3.jpg' },
  ],
  Photography: [
    { title: 'Learning to See the Light', author: 'Ava Morgan', date: '2026-11-23T14:35:00', image: '/images/categories/photography-1.jpg' },
    { title: 'The Camera I Always Carry', author: 'Oliver Hayes', date: '2026-11-22T08:50:00', image: '/images/categories/photography-2.jpg' },
    { title: 'Stories Through the Lens', author: 'Isla Chen', date: '2026-11-19T17:15:00', image: '/images/categories/photography-3.jpg' },
  ],
  'Business and news': [
    { title: 'Building for What Comes Next', author: 'Daniel Kim', date: '2026-11-24T06:45:00', image: '/images/categories/business-1.jpg' },
    { title: 'Better Teams, Better Ideas', author: 'Grace Wilson', date: '2026-11-21T13:10:00', image: '/images/categories/business-2.jpg' },
    { title: 'Turning Plans Into Progress', author: 'Marcus Lee', date: '2026-11-18T09:20:00', image: '/images/categories/business-3.jpg' },
  ],
  'Creative writing': [
    { title: 'Writing the First Honest Line', author: 'Elena Foster', date: '2026-11-23T20:05:00', image: '/images/categories/creative-1.jpg' },
    { title: 'A Quiet Space to Make Things', author: 'Theo Walker', date: '2026-11-20T15:55:00', image: '/images/categories/creative-2.jpg' },
    { title: 'Where New Stories Begin', author: 'Mia Santos', date: '2026-11-17T11:40:00', image: '/images/categories/creative-3.jpg' },
  ],
  Podcast: [
    { title: 'Conversations Worth Keeping', author: 'Jamie Parker', date: '2026-11-24T09:00:00', image: '/images/categories/podcast-1.jpg' },
    { title: 'Behind the Microphone', author: 'Alex Thompson', date: '2026-11-22T19:45:00', image: '/images/categories/podcast-2.jpg' },
    { title: 'Voices That Stay With You', author: 'Riley Adams', date: '2026-11-19T12:30:00', image: '/images/categories/podcast-3.jpg' },
  ],
}

function formatDateTime(date) {
  return new Date(date).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

</script>

<template>
  <section class="home-hero">
    <div class="container hero-layout">
      <div class="hero-text">
        <p class="eyebrow">Blog platform</p>
        <h1>Start a story.<br />Share it with<br />the world.</h1>
        <p class="hero-copy">A simple place to publish your ideas, find thoughtful writing, and connect through conversation.</p>
        <RouterLink class="btn btn-primary hero-cta" to="/addPost">Start writing for free</RouterLink>
      </div>
      <div class="hero-visual">
        
        <img
          class="hero-image"
          src="/images/hero-writing.png"
          alt="Writer creating an online article on a laptop"
        />
      </div>
    </div>
  </section>

  <section class="container home-topics">
    <p class="eyebrow">Browse by topic</p>
    <h2>What would you like to read?</h2>
    <div class="home-topic-options">
      <button
        v-for="category in categories"
        :key="category"
        type="button"
        class="home-topic-link"
        :class="{ selected: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
    <div class="topic-gallery-heading">
      <p class="eyebrow">{{ selectedCategory }}</p>
    </div>
    <div class="topic-gallery">
      <article v-for="item in categoryPosts[selectedCategory]" :key="item.title" class="topic-story">
        <img :src="item.image" :alt="item.title" loading="lazy" />
        <div class="topic-story-meta">
          <span>By {{ item.author }}</span>
          <time :datetime="item.date">{{ formatDateTime(item.date) }}</time>
        </div>
        <h3>{{ item.title }}</h3>
      </article>
    </div>
  </section>

  <section class="writing-invitation">
    <div class="container writing-invitation-layout">
      <div class="writing-invitation-copy">
        <p class="eyebrow">Your voice belongs here</p>
        <h2>One thought can become the story someone needed today.</h2>
        <p>You do not need a perfect draft—only a place to begin. StoryNest gives your ideas room to grow, one honest paragraph at a time.</p>
        <RouterLink class="btn invitation-cta" to="/addPost">Write your first line <i class="bi bi-arrow-right"></i></RouterLink>
      </div>
      <div class="writing-path" aria-label="Three steps to publish a story">
        <div class="writing-step">
          <span>01</span>
          <div><h3>Choose your angle</h3><p>Start with a topic you care about and make it personal.</p></div>
        </div>
        <div class="writing-step">
          <span>02</span>
          <div><h3>Follow the idea</h3><p>Write freely, revise thoughtfully, and let your point of view lead.</p></div>
        </div>
        <div class="writing-step">
          <span>03</span>
          <div><h3>Open the conversation</h3><p>Publish when you are ready and connect with readers through comments.</p></div>
        </div>
      </div>
    </div>
  </section>

</template>

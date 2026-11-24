<script setup>
defineProps({
  post: { type: Object, required: true },
})

function formatDate(date) {
  return new Date(date).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
</script>

<template>
  <article class="post-row">
    <div class="post-meta">
      <span class="post-category">{{ post.category || 'Personal journal' }}</span>
      <span class="post-author">By @{{ post.authorUsername }}</span>
      <time :datetime="post.createdOn">{{ formatDate(post.createdOn) }}</time>
    </div>
    <div class="post-summary">
      <h2>{{ post.title }}</h2>
      <p class="post-excerpt">{{ post.content }}</p>
      <RouterLink :to="`/posts/${post._id}`" class="read-link">Read the story <i class="bi bi-arrow-right"></i></RouterLink>
    </div>
  </article>
</template>

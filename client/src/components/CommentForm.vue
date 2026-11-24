<script setup>
import { ref } from 'vue'
import { Notyf } from 'notyf'
import api from '../api'

const props = defineProps({ postId: String })
const emit = defineEmits(['comment-added'])
const comment = ref('')
const notyf = new Notyf()

async function handleSubmit() {
  if (comment.value.trim() === '') {
    notyf.error('Please write a comment')
    return
  }

  try {
    let response = await api.post(`/posts/${props.postId}/comments`, {
      comment: comment.value,
    })

    if (response.status === 201) {
      comment.value = ''
      notyf.success(response.data.message)
      emit('comment-added')
    }
  } catch (error) {
    if (error.response) {
      notyf.error(error.response.data.message)
    } else {
      notyf.error('Error adding comment. Please contact administrator.')
    }
  }
}
</script>

<template>
  <form class="comment-form" v-on:submit.prevent="handleSubmit">
    <textarea v-model="comment" class="form-control" rows="3" placeholder="Write a comment"></textarea>
    <button class="btn btn-primary mt-2">Add Comment</button>
  </form>
</template>

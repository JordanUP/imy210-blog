<!--Jordan Reddy, u24597181 -->
<template>
  <div class="card">
    <h2>{{ post.title }}</h2>
    <p>By {{ post.author }}</p>
    <p>{{ post.snippet }}</p>
    <nuxt-link :to="`/post/${post.documentId}`" class="card a">Read More</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
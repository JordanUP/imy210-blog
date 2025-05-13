<!--Jordan Reddy, u24597181 -->
<template>
  <div class="container">
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/search">Search</nuxt-link>
    </nav>
    <h1>Blog Posts</h1>
    <CategoryFilter v-model="selectedCategory" @update="fetchPosts" />
    <div class="grid">
      <BlogCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      selectedCategory: '',
      allPosts: [],
    };
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch(`${process.env.STRAPI_API_URL}/api/blog-posts`);
        const { data } = await response.json();
        this.allPosts = data.map(post => ({
          id: post.id,
          documentId: post.documentId,
          title: post.title,
          author: post.author,
          content: post.content,
          category: post.category,
          snippet: post.snippet,
        }));

        if (this.selectedCategory) {
          this.posts = this.allPosts.filter(
            post => post.category === this.selectedCategory
          );
        } else {
          this.posts = [...this.allPosts];
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.posts = [];
      }
    },
  },
};
</script>
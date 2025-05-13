<!--Jordan Reddy, u24597181 -->
<template>
  <div class="container">
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/search">Search</nuxt-link>
    </nav>
    <h1>Search Posts</h1>
    <input v-model="searchQuery" @input="searchPosts" placeholder="Search posts..." />
    <div class="grid">
      <BlogCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      searchQuery: '',
      filteredPosts: [],
    };
  },
  async mounted() {
    try {
      const response = await fetch(`${process.env.STRAPI_API_URL}/api/blog-posts`);
      const { data } = await response.json();
      this.posts = data.map(post => ({
        id: post.id,
        documentId: post.documentId,
        title: post.title,
        author: post.author,
        content: post.content,
        category: post.category,
        snippet: post.snippet,
      }));
      this.filteredPosts = [...this.posts];
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.posts = [];
      this.filteredPosts = [];
    }
  },
  methods: {
    searchPosts() {
      if (!this.searchQuery) {
        this.filteredPosts = [...this.posts];
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredPosts = this.posts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.snippet.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
      );
    },
  },
};
</script>
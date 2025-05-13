<!--Jordan Reddy, u24597181 -->
<template>
  <div class="container">
    <h1>{{ post.title || 'Loading...' }}</h1>
    <p v-if="post.author">By {{ post.author }}</p>
    <div class="prose" v-html="renderMarkdown(contentToString(post.content))"></div>
    <a href="/" class="card a">Back to Home</a>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      post: {},
      md: new MarkdownIt(),
    };
  },
  async asyncData({ params, error }) {
    try {
      const response = await fetch(
        `${process.env.STRAPI_API_URL}/api/blog-posts/${params.id}` // Use documentId from route
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.data) {
        return {
          post: { id: result.data.id, ...result.data },
        };
      } else {
        throw new Error('Post not found in API response');
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      error({ statusCode: 404, message: 'Post not found' });
      return { post: {} };
    }
  },
  methods: {
    contentToString(content) {
      if (!content || !Array.isArray(content)) return '';
      return content
        .map(block => {
          if (block.type === 'paragraph' && block.children) {
            return block.children.map(child => child.text || '').join('');
          }
          return '';
        })
        .join('\n');
    },
    renderMarkdown(content) {
      return this.md.render(content || '');
    },
  },
};
</script>
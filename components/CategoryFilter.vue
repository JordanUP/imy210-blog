<!--Jordan Reddy, u24597181 -->
<template>
  <div>
    <label for="category">Filter by Category:</label>
    <select id="category" v-model="category" @change="$emit('update')">
      <option value="">All</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ['Games', 'Film & TV', 'Uni'],
      category: '',
    };
  },
  watch: {
    category(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>
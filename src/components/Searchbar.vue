<template>
  <div class="filter">
    <at-select size="large" style="width: 100px">
      <at-option value="1">Appetizer</at-option>
      <at-option value="2">Main Course</at-option>
      <at-option value="3">Side Dish</at-option>
      <at-option value="4">Dessert</at-option>
    </at-select>
    <at-input v-model="inputValue" size="large" placeholder="Large Size"></at-input>
    <at-button type="primary" icon="icon-search">Search</at-button>
  </div>
</template>

<script>
  export default {
    created() {

    },

    beforeDestroy() {

    },

    data() {
      return {
      inputValue: ''
      }
    },

    methods: {
    }
  }
</script>

<style scoped>
  .guest-input {
    max-width: 50px;
  }
</style>
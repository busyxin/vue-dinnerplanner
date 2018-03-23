<template>
  <div class="welcome">
    <p>
      {{ msg }}
    </p>

    <router-link to="/search">
      <at-button type="primary" size="large">Start planning</at-button>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to the dinner planner Vue Startup code!'
      }
    }
  }
</script>

<style scoped>

</style>

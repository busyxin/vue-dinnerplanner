<template>
  <div class="welcome">
    <p>
      {{ msg }}
    </p>

    <router-link to="/search">
      <button>Start planning</button>
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

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>
  button {
    color: blue;
  }
</style>

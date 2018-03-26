<template>
  <div class="welcome-container">
    <div class="welcome">
      <h1 class="welcome__header">Welcome to the Dinner Planner</h1>
      <p class="welcome__text">
        {{ msg }}
      </p>
      <router-link to="/search">
        <at-button type="primary" size="large">Start planning</at-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Easily find recipes, create your own menu, organise your groceries and organise your dinner in 5 minutes with our powerful yet simple webapp!'
      }
    }
  }
</script>

<style scoped>
  .welcome-container{
    position: relative;
    height: 100%;
  }

  .welcome {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 500px;
    margin-left: -250px;
    margin-top: -100px;
  }

  .welcome__header {
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .welcome__text {
    line-height: 1.5;
    margin-bottom: 1rem;
  }
</style>

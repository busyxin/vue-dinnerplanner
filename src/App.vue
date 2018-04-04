<template>
  <div id="app">
    <header>
      <img class="logo" src="./assets/dinner.svg">
      Dinner planner
    </header>
    <div class="app-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    height: 100%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }

  #app {
    background-image: url('./assets/bg.png');
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex: 1 0 auto;
  }

  header {
    background: white;
    font-size: 3rem;
    text-transform: uppercase;
    color: #6190E8;
    text-align: center;
    box-shadow: 0 0 20px -5px rgba(0,0,0,.3);
    margin-bottom: 1rem;
  }

  .logo {
    height: 3rem;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    margin: 0 auto;
    padding: 0;
    max-width: 1200px;
    width: 100%;
  }

  .section-container {
    display: flex;
  }

  .panel {
    background: #ffffff;
    box-shadow: 0 0 20px -5px rgba(0,0,0,.3);
    padding: 1rem;
    flex: 1 0 auto;
  }
</style>
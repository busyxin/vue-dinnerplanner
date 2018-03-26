<template>
  <div id="app">
    <transition name="fade">
      <div class="app-container">        
       <router-view/>
      </div>
    </transition>
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
    min-height: 100%;
    flex: 1 0 auto;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    margin: 0 auto;
    padding: 2rem 0;
    max-width: 1200px;
  }

  .section-container {
    display: flex;
  }

  .panel {
    background: #ffffff;
    box-shadow: 0 0 20px -5px rgba(0,0,0,.3);
    padding: 1rem;
  }
</style>
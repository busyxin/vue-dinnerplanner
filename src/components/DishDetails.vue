<template>
  <div class="select-dish">
    <h2>This is the DishDetails screen</h2>
    <sidebar :model="this.model"/>
    <router-link to="/search">
      <at-button>Go back</at-button>
    </router-link>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
    }
  }
</script>

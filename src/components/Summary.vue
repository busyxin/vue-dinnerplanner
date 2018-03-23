<template>
  <div class="select-dish">
    <h2>This is the Summary screen</h2>
    <sidebar :model="this.model"/>
    <router-link to="/print">
      <at-button type="primary" size="large">Print Dinner</at-button>
    </router-link>
  </div>
</template>

<script>
  import Dishes from '@/components/Dishes'
  import Sidebar from '@/components/Sidebar'

  export default {
    props: ['model'],
    components: {
      'dishes': Dishes,
      'sidebar': Sidebar
    }
  }
</script>

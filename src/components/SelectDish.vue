<template>
  <div class="select-dish section-container">
    <sidebar :model="this.model"/>
    <dishes :model="this.model"/>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
      'dishes': Dishes
    }
  }
</script>

<style scoped>
  .select-dish {
    display: flex;
  }
</style>
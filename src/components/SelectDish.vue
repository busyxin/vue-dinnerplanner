<template>
  <div class="select-dish">
    <h2>This is the Select Dish screen</h2>
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

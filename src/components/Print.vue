<template>
  <div class="print">
    <h2>This is the Print screen</h2>
    <sidebar :model="this.model"/>
    <dishes/>
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

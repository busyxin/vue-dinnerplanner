<template>
  <div class="print section-container">
    <ul class="dish-list">
      <li class="dish" v-for="dish in dishes" :id="dish.id" :key="dish.id">
          <at-card class="dish" :body-style="{ padding: 0 }">
            <div>
              <img class="dish__img" :src="dish.image">
              <div class="dish__caption">
                <p>{{ dish.title }}</p>
                <p>{{ dish.instructions }}</p>
              </div>
            </div>
          </at-card>
      </li>
    </ul>
  </div>
</template>

<script>
  import Dishes from '@/components/Dishes'
  import Sidebar from '@/components/Sidebar'

  export default {
    props: ['model'],
    components: {
      'dishes': Dishes,
    },
    data: function() {
      return {
        dishes: this.model.getMenu()
      }
    }
  }
</script>

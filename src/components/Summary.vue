<template>
  <div class="summary section-container">
    <ul class="dish-list">
      <li class="dish" v-for="dish in dishes" :id="dish.id" :key="dish.id">
        <router-link :to="{ name: 'DishDetails', params: { dishId: dish.id }}">
          <at-card class="dish" :body-style="{ padding: 0 }">
            <div>
              <img class="dish__img" :src="dish.image">
              <div class="dish__caption">
                <p>{{ dish.title }}</p>
                <p>{{ dish.pricePerServing * numberOfGuests }}</p>
              </div>
            </div>
          </at-card>
        </router-link>
      </li>
    </ul>
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
    },
    data: function() {
      return {
        dishes: this.model.getMenu(),
        numberOfGuests: this.model.getNumberOfGuests()
      }
    }
  }
</script>

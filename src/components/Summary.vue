<template>
  <div class="summary section-container panel">
    <ul class="dish-list">
      <li class="dish" v-for="dish in dishes" :id="dish.id" :key="dish.id">
        <at-card :body-style="{ padding: 0 }">
          <div>
            <img class="dish__img" :src="dish.image">
            <div class="dish__caption">
              <p>{{ dish.title }}</p>
              <p>{{ Number(dish.pricePerServing * numberOfGuests).toFixed(2) }} SEK</p>
            </div>
          </div>
        </at-card>
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

<style scoped>
  .summary {
    flex-direction: column;
    justify-content: center;
    flex: 1 0 auto;
    align-items: center;
  }

  .dish-list {
    display: flex;
  }

  .dish {
    max-width: 200px;
    margin: 0 .5rem 1rem;
  }

  .dish__img {
    max-width: 200px;
  }

  .dish__caption {
    padding: 1rem;
    font-weight: 700;
  }
</style>
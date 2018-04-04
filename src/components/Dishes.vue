<template>
  <div class="dishes">
    <div class="filter panel">
      <h3>Find the recipes for your perfect dinner</h3>
      <form v-on:submit="submit" class="filter-inline">
        <at-select v-model="selectValue" size="large" style="width: 100px">
          <at-option value="all">All</at-option>
          <at-option value="breakfast">Breakfast</at-option>
          <at-option value="appetizer">Appetizer</at-option>
          <at-option value="main course">Main Course</at-option>
          <at-option value="side dish">Side Dish</at-option>
          <at-option value="salad">Salad</at-option>
          <at-option value="bread">Bread</at-option>
          <at-option value="soup">Soup</at-option>
          <at-option value="sauce">Sauce</at-option>
          <at-option value="drink">Drink</at-option>
          <at-option value="beverage">Beverage</at-option>
        </at-select>
        <at-input v-model="inputValue" size="large" placeholder="Search for a recipe"></at-input>
        <at-button v-on:click="submit" type="primary" icon="icon-search">Search</at-button>
      </form>
    </div>
    <div class="panel">
      <em v-if='status === "INITIAL"'>Loading...</em>
      <at-alert v-else-if='status === "ERROR"' message="Failed to load data, please try again" type="error"></at-alert>
      <ul v-else-if='status === "LOADED"' class="dish-list">
        <li class="dish-item" v-for="dish in dishes" :id="dish.id" :key="dish.id">
          <router-link :to="{ name: 'DishDetails', params: { dishId: dish.id }}">
            <at-card class="dish" :body-style="{ padding: 0 }">
              <div class="dish__img-wrapper">
                <img class="dish__img" :src="'https://spoonacular.com/recipeImages/' + dish.image">
              </div>
              <div class="dish__caption">
                <p>{{ dish.title }}</p>
              </div>
            </at-card>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import { modelInstance } from "../data/DinnerModel"

  export default {
    props: ['model'],

    mounted() {
      this.loadData()
    },

    data() {
      return {
        status: 'INITIAL',
        dishes: [],
        selectValue: 'all',
        inputValue: '',
      }
    },

    watch: {
      '$route': 'loadData'
    },

    methods: {
      loadData() {
        const {dishtype, search} = this.$route.query
        this.selectValue = dishtype || 'all'
        this.inputValue = search

        modelInstance.getAllDishes(this.selectValue, this.inputValue).then(dishes => {
          this.status = 'LOADED'
          this.dishes = dishes.results

        }).catch(() => {
          this.status = 'ERROR'
          this.$Message.error("The dishes couldn't be loaded, please try again.")
        })
      },
      submit() {
        const {dishtype, search} = this.$route.query

        if (dishtype !== this.selectValue || search !== this.inputValue) {
          this.status = 'INITIAL'
          this.$router.push({ path: 'search', query: {
            dishtype: this.selectValue,
            search: this.inputValue
          }})
        }
      }
    }
  }
</script>

<style scoped>
  .dishes {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .filter {
    margin-bottom: 1rem;
    flex: 0;
  }

  .filter-inline {
    display: flex;
  }

  .dish-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }

  .dish-item {
    margin-bottom: 1rem;
  }

  .dish {
    max-width: 200px;
    margin: 0 1rem;
  }

  .dish__img-wrapper {
    height: 150px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dish:hover .dish__img {
    transform: scale(1.5, 1.5);
  }

  .dish__img {
    width: 300px;
    transition: all .3s ease;
  }

  .dish__caption {
    padding: 1rem;
    font-weight: 700;
  }
</style>

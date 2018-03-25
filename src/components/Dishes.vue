<template>
  <div class="Dishes">
    <h3>Dishes</h3>
    <div class="filter">
      <at-select v-model="selectValue" size="large" style="width: 100px">
        <at-option value="all">All</at-option>
        <at-option value="2">Appetizer</at-option>
        <at-option value="3">Main Course</at-option>
        <at-option value="4">Side Dish</at-option>
        <at-option value="5">Dessert</at-option>
      </at-select>
      <at-input v-model="inputValue" size="large" placeholder="Search for a recipe"></at-input>
      <at-button v-on:click="submit" type="primary" icon="icon-search">Search</at-button>
    </div>
    <ul class="dish-list">
      <em v-if='status === "INITIAL"'>Loading...</em>
      <at-alert v-else-if='status === "ERROR"' message="Failed to load data, please try again" type="error"></at-alert>
      <li class="dish" v-for="dish in dishes" :id="dish.id" :key="dish.id">
        <router-link :to="{ name: 'DishDetails', params: { dishId: dish.id }}">
          <at-card class="dish" :body-style="{ padding: 0 }">
            <div>
              <img class="dish__img" :src="'https://spoonacular.com/recipeImages/' + dish.image">
              <div class="dish__caption">
                <p>{{ dish.title }}</p>
              </div>
            </div>
          </at-card>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property, 
  // we can import the model instance directly
  import { modelInstance } from "../data/DinnerModel";

  export default {
    props: ['model'],
    // this methods is called by Vue lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      modelInstance.getAllDishes().then(dishes => {
        this.status = 'LOADED'
        this.dishes = dishes.results
        this.model.pushRequest(['lalla'])

      }).catch(() => {
        this.status = 'ERROR'
        this.$Message.error('This is a error message!')
      })
    },

    data() {
      return {
        status: 'INITIAL',
        dishes: [],
        selectValue: 'all',
        inputValue: '',
      }
    },

    methods: {
      update() {
        this.dishes = this.model.getResultDishes()
      },
      
      submit: function() {
        this.status = 'INITIAL';

        this.model.getAllDishes(this.selectValue, this.inputValue).then(dishes => {
          this.status = 'LOADED';
          this.dishes = dishes.results;
          this.model.pushRequest(['lalla']);
          console.log(
            this.model.getCachedRequests()
          )
        }).catch(() => {
          this.status = 'ERROR'
          this.$Message.error('This is a error message!')
        })
      }
    }
  }
</script>

<style scoped>
  .dish-list {
    display: flex;
  }

  .dish {
    max-width: 300px;
    margin: 1rem;
  }

  .dish__img {
    width: 300px;
    max-height: 50p;
  }

  .dish__caption {
    padding: 1rem;
  }
</style>

<template>
  <div class="dish-details section-container">
    <sidebar :model="this.model"/>
    <div class="panel">
      <at-button v-on:click="goBack">Go back</at-button>
      <em v-if='status === "INITIAL"'>Loading...</em>
      <at-alert v-else-if='status === "ERROR"' message="Failed to load data, please try again" type="error"></at-alert>
      <div v-if='status === "LOADED"'>
        <img class="dish__img" :src="dish.image">
        <div class="dish__caption">
          <h1>{{ dish.title }}</h1>
        </div>
        <h3>Preparation time: {{ dish.preparationMinutes }} minutes</h3>
        <h3>Cooking time: {{ dish.cookingMinutes }} minutes</h3>
        <h3>Ready in {{ dish.readyInMinutes }} minutes</h3>
        <h3>Servings: {{ dish.servings }}</h3>
        <h3>Price per serving: {{ dish.pricePerServing }} SEK</h3>
        <h3>Preparation</h3>
        <p>{{ dish.instructions }}</p>
        <at-button v-on:click="addToMenu" type="primary" icon="icon-menu">Add to Menu</at-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'
  import Dishes from '@/components/Dishes'
  import { modelInstance } from "../data/DinnerModel";

  export default {
    props: ['model'],

    components: {
      'sidebar': Sidebar,
    },

    created() {
      this.model.addObserver(this)
    },

    data() {
      return {
        status: 'INITIAL',
        dish: undefined,
      }
    },

    mounted() {
      const { dishId } = this.$route.params

      modelInstance.getDish(this.$route.params.dishId).then(dish => {
        this.dish = dish
        this.status =  'LOADED'

      }).catch(error => {
        this.status = 'ERROR'
          this.$Message.error("The dish information couldn't be loaded, please try again.")
      })
    },

    methods: {
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests()
        this.menu = this.model.getMenu()
      },
      addToMenu: function() {
        this.model.addDishToMenu(this.dish)
      },
      goBack: function() {
        this.$router.go(-1)
      }
    }
  }
</script>

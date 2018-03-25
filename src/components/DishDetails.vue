<template>
  <div class="select-dish">
    <h2>This is the DishDetails screen</h2>
    <sidebar :model="this.model"/>
    <router-link to="/search">
      <at-button>Go back</at-button>
    </router-link>
    <em v-if='status === "INITIAL"'>Loading...</em>
    <at-alert v-else-if='status === "ERROR"' message="Failed to load data, please try again" type="error"></at-alert>

    <div v-if='status === "LOADED"'>
      <at-card class="dish">
        <div>
          <img class="dish__img" :src="dish.image">
          <div class="dish__caption">
            <p>{{ dish.title }}</p>
          </div>
        </div>
      </at-card>
      <at-button v-on:click="addToMenu" type="primary" icon="icon-menu">Add to Menu</at-button>
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
    data() {
      return {
        status: 'INITIAL',
        dish: undefined
      }
    },
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      modelInstance.getDish(this.$route.params.dishId).then(dish => {
        this.dish = dish
        this.status =  'LOADED'

      }).catch(() => {
        this.status = 'ERROR'
        this.$Message.error('This is a error message!')
      })
    },

    methods: {
      addToMenu: function() {
        this.model.addDishToMenu(this.dish)
      }
    }
  }
</script>

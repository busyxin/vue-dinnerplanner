<template>
  <div class="sidebar">
    <h3>This is the sidebar</h3>
    <p>
      People: 
      <at-input-number class="guest-input" :value="numberOfGuests" @input="onDidChangeNumberOfGuests" @change="onDidChangeNumberOfGuests" :min="1" size="large"></at-input-number>
      <br/>
      Total number of guests: {{ numberOfGuests }}
    </p>

    <ul>
      <li class="dish" v-for="dish in menu" :id="dish.id" :key="dish.id">
        {{dish.title}}
        <at-popover placement="top" v-model="showPopover" @toggle="togglePopover">
          <at-button size="small"><i class="icon icon-trash"></i></at-button>
          <template slot="content">
            <p>Remove {{dish.title}} from your menu?</p>
            <div style="text-align: right; margin-top: 8px;">
              <at-button size="smaller" @click="showPopover = false">Cancel</at-button>
              <at-button type="primary" size="smaller" @click="_ => removeDish(dish.id)">Remove from menu</at-button>
            </div>
          </template>
        </at-popover>
      </li>
    </ul>  

    <router-link to="/summary">
      <at-button type="primary" size="large">Confirm dinner</at-button>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['model'],
    created() {
      this.model.addObserver(this)
    },

    beforeDestroy() {
      this.model.removeObserver(this)
    },

    data() {
      return {
        showPopover: false,
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: this.model.getMenu()
      }
    },

    methods: {
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests()
        this.menu = this.model.getMenu()
      },

      togglePopover() {
        this.showPopover = !this.showPopover
      },

      removeDish(dishId) {
        this.showPopover = false
        this.model.removeDishFromMenu(dishId)
      },

      onDidChangeNumberOfGuests(value) {
        this.model.setNumberOfGuests(value)
      }
    }
  }
</script>

<style scoped>
  .guest-input {
    max-width: 50px;
  }
</style>
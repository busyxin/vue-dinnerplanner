<template>
  <div class="sidebar">
    <h3>This is the sidebar</h3>
    <p>
      People: 
      <at-input-number class="guest-input" :value="numberOfGuests" @input="onDidChangeNumberOfGuests" @change="onDidChangeNumberOfGuests" :min="1" size="large"></at-input-number>
      <br/>
      Total number of guests: {{ numberOfGuests }}
    </p>

    <at-popover placement="top" v-model="show" @toggle="toggleShow">
      <at-button size="small"><i class="icon icon-trash"></i></at-button>
      <template slot="content">
        <p>This is part of the content, sure to delete it?</p>
        <div style="text-align: right; margin-top: 8px;">
          <at-button size="smaller" @click="show = false">Cancel</at-button>
          <at-button type="primary" size="smaller" @click="show = false">Sure</at-button>
        </div>
      </template>
    </at-popover>

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
        show: false,
        numberOfGuests: this.model.getNumberOfGuests()
      }
    },

    methods: {
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests()
      },

      toggleShow() {
        this.show = !this.show
      },

      onDidChangeNumberOfGuests(e) {
        this.model.setNumberOfGuests(+e.target.value)
      }
    }
  }
</script>

<style scoped>
  .guest-input {
    max-width: 50px;
  }
</style>
<template>
  <div class="sidebar">
    <h3>This is the sidebar</h3>
    <p>
      People: <input :value="numberOfGuests" @input="onDidChangeNumberOfGuests" @change="onDidChangeNumberOfGuests"/>
      <br/>
      Total number of guests: {{ numberOfGuests }}
    </p>
  </div>
</template>

<script>
  export default {
    props: ['model'],
    // this methods is called by React lifecycle when the 
    // component is created that's a good place to setup model observer
    created() {
      this.model.addObserver(this)
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      this.model.removeObserver(this)
    },

    // we define and initalise the data we want to use and modify in the component
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests()
      }
    },

    methods: {
      // in our update function we modify the the property of 
      // the compoented which will cause the component to re-render
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests()
      },

      // our handler for the input's on change event
      onDidChangeNumberOfGuests(e) {
        this.model.setNumberOfGuests(+e.target.value)
      }
    }
  }
</script>

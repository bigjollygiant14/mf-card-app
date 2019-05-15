<template>
  <div id="app">
    <CardList class="container" />
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Vue } from "vue-property-decorator";

// Components
import CardList from "./components/CardList.vue";

// Stylesheet
import "./styles/app.scss";

@Component({
  components: {
    CardList
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

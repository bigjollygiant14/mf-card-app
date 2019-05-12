<template>
  <div>
    <h2>CardFilters</h2>
    <Checkbox
      v-for="(option, index) in cardTypeFilters"
      v-bind:key="index"
      v-bind:label="option.label"
      v-bind:checked="option.checked"
      @input="option.checked = $event"
    />
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import Checkbox from "./common/Checkbox.vue";

@Component({
  components: {
    Checkbox
  }
})
export default class CardFilters extends Vue {
  private cardTypeFilters = [
    {
      label: "Balance Transfer",
      name: "balance_transfer",
      checked: false
    },
    {
      label: "Low Interest",
      name: "low_interest",
      checked: false
    },
    {
      label: "Travel",
      name: "travel",
      checked: false
    },
    {
      label: "Cash Back",
      name: "cash_back",
      checked: false
    }
  ];
}
</script>

<style scoped lang="scss"></style>

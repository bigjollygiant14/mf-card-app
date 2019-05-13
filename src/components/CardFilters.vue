<template>
  <div class="CardFilters">
    <!-- <Checkbox
      v-for="(option, index) in cardTypeFilters"
      v-bind:key="index"
      v-bind:label="option.label"
      v-bind:checked="option.checked"
      @input="option.checked = $event"
    />-->

    <FilterButton
      class="CardFilters__filter"
      v-for="(option, index) in cardTypeFilters"
      v-bind:key="index"
      v-bind:checked="option.checked"
      v-bind:name="option.name"
      v-on:filterbtn-clicked="onFilterClick"
    >
      <h3>{{ option.label }}</h3>
      <Icon v-bind:icon="option.icon" />
    </FilterButton>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import Checkbox from "./common/Checkbox.vue";
import FilterButton from "./common/FilterButton.vue";
import Icon from "./common/Icon.vue";

@Component({
  components: {
    Checkbox,
    FilterButton,
    Icon
  }
})
export default class CardFilters extends Vue {
  // To Do: Font Awesome CheckBoxes
  // Active and unactive state
  private cardTypeFilters = [
    {
      label: "Balance Transfer",
      name: "balance_transfer",
      checked: false,
      icon: "exchange-alt"
    },
    {
      label: "Low Interest",
      name: "low_interest",
      checked: false,
      icon: "tag"
    },
    {
      label: "Travel",
      name: "travel",
      checked: false,
      icon: "plane-departure"
    },
    {
      label: "Cash Back",
      name: "cash_back",
      checked: false,
      icon: "hand-holding-usd"
    }
  ];

  private onFilterClick(name: string): void {
    const index = this.cardTypeFilters.findIndex(card => {
      return card.name === name;
    });
    this.cardTypeFilters[index].checked = !this.cardTypeFilters[index].checked;
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.CardFilters {
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;

  &__filter {
    align-items: baseline;
    background-color: $brand-blue;
    color: $white;
    display: flex;
    flex-basis: 25%;
    flex-wrap: wrap;
    height: 100%;
    justify-content: center;
    margin-right: $margin;
    padding: $padding;
    text-align: center;

    &:last-child {
      margin-right: 0;
    }

    .Icon {
      align-self: flex-end;
      font-size: $font-size-large;
    }
  }
}
</style>

<template>
  <div class="CardFilters">
    <FilterButton
      class="CardFilters__filter"
      v-for="(option, index) in cardTypeFilters"
      v-bind:key="index"
      v-bind:checked="option.checked"
      v-bind:name="option.name"
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
import FilterButton from "./common/FilterButton.vue";
import Icon from "./common/Icon.vue";

// Types
import { Filters } from "@/lib";

@Component({
  components: {
    FilterButton,
    Icon
  }
})
export default class CardFilters extends Vue {
  @Prop() private cardTypeFilters!: Filters[];
}
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/breakpoints";

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

    &:hover {
      background-color: darken($brand-blue, 5%);
    }

    &:last-child {
      margin-right: 0;
    }

    @include respond-above(sm) {
      align-items: center;
      height: 48px;
      flex-wrap: nowrap;
    }

    .Icon {
      align-self: flex-end;
      font-size: $font-size-large;

      @include respond-above(sm) {
        align-self: center;
      }
    }
  }
}
</style>

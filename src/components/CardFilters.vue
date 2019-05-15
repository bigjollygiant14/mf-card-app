<template>
  <div class="CardFilters">
    <div class="CardFilters__copy">
      <slot></slot>
    </div>
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
  flex: 8;
  flex-wrap: wrap;
  justify-content: space-between;

  @include respond-above(sm) {
    flex: 6;
    flex-wrap: nowrap;
  }

  &__copy {
    flex: 8;
    flex-basis: 100%;

    @include respond-above(sm) {
      flex: 2;
    }
  }

  &__filter {
    &:last-child {
      margin-right: 0;
    }

    @include respond-above(sm) {
      align-items: center;
      flex: 1;
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

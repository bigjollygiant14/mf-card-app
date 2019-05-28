<template>
  <div class="CardFilters">
    <div class="CardFilters__filters">
      <div class="CardFilters__copy">
        <slot name="filterCopy"></slot>
      </div>
      <div class="CardFilters__filters-list">
        <FilterButton
          class="CardFilters__filter"
          v-for="(option, index) in cardTypeFilters"
          v-bind:key="'card' + index"
          v-bind:checked="option.checked"
          v-bind:type="option.type"
          v-bind:name="option.name"
        >
          <h3>{{ option.label }}</h3>
          <Icon v-bind:icon="option.icon" />
        </FilterButton>
      </div>
    </div>

    <div class="CardFilters__filters">
      <div class="CardFilters__copy">
        <slot name="subFilterCopy"></slot>
      </div>
      <div class="CardFilters__filters-list">
        <FilterButton
          class="CardFilters__filter CardFilters__filter--secondary"
          v-for="(option, index) in creditTypeFilters"
          v-bind:key="'credit' + index"
          v-bind:checked="option.checked"
          v-bind:name="option.name"
          v-bind:type="option.type"
          button-type="secondary"
        >
          <h3>{{ option.label }}</h3>
        </FilterButton>
      </div>
    </div>
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
  @Prop() private creditTypeFilters!: Filters[];
}
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/breakpoints";

.CardFilters {
  &__filters {
    display: flex;
    flex: 8;
    flex-wrap: wrap;

    &-list {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: $margin;

      @include respond-above(sm) {
        flex-basis: 75%;
        flex-wrap: nowrap;
      }
    }
  }

  &__copy {
    flex: 8;
    flex-basis: 100%;

    @include respond-above(sm) {
      flex: 2;
      flex-basis: 25%;
    }
  }

  &__filter {
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

    &--secondary {
      font-size: 12px;
      height: 20px;

      h3 {
        margin: 0;
      }
    }
  }
}
</style>

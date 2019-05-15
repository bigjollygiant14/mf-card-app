<template>
  <div
    class="FilterButton"
    v-bind:class="{ 'FilterButton--checked': checked === true }"
    v-on:mousedown="emitGlobalClickEvent"
  >
    <slot></slot>
    <div class="FilterButton__icon-container">
      <Icon class="FilterButton__icon" icon="check"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import Icon from "./Icon.vue";

// Event Bus
import { EventBus } from "@/lib";

@Component({
  components: {
    Icon
  }
})
export default class FilterButton extends Vue {
  @Prop() private checked!: boolean;
  @Prop() private name!: string;

  private emitGlobalClickEvent(): void {
    EventBus.$emit("apply-filter", this.name);
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/breakpoints";

.FilterButton {
  align-items: baseline;
  background-color: $brand-blue;
  border: 2px solid $brand-blue;
  border-radius: $border-radius;
  color: $white;
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  height: 80px;
  justify-content: center;
  margin-right: $margin;
  padding: $padding;
  position: relative;
  text-align: center;

  @include respond-above(sm) {
    &:hover {
      background-color: darken($brand-blue, 10%);
    }
  }

  &__icon {
    align-items: center;
    border: 2px solid $gray-600;
    background-color: $white;
    border-radius: 50%;
    color: $brand-blue;
    display: flex;
    font-size: $font-size-base;
    justify-content: center;
  }

  &__icon-container {
    align-items: center;
    display: none;
    justify-content: center;
    left: -6px;
    position: absolute;
    top: -6px;
  }

  &--checked {
    background-color: $white;
    color: $brand-blue;

    @include respond-above(sm) {
      &:hover {
        background-color: $gray-200;
        cursor: pointer;

        .FilterButton__icon {
          background-color: $gray-200;
        }
      }
    }

    .FilterButton__icon {
      &-container {
        display: flex;
      }
    }
  }
}
</style>

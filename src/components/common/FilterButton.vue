<template>
  <div
    class="FilterButton"
    v-bind:class="{
      'FilterButton--primary': buttonType === 'primary',
      'FilterButton--secondary': buttonType === 'secondary',
      'FilterButton--checked': checked === true
    }"
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
  @Prop({ default: "primary" }) private buttonType?: string;
  @Prop() private checked!: boolean;
  @Prop() private name!: string;
  @Prop() private type!: string;

  private emitGlobalClickEvent(): void {
    EventBus.$emit("apply-filter", this.name, this.type);
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/breakpoints";

.FilterButton {
  align-items: baseline;
  border-radius: $border-radius;
  display: flex;
  flex: 2;
  flex-wrap: wrap;
  height: 80px;
  justify-content: center;
  margin-right: $margin;
  padding: $padding;
  position: relative;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  &__icon {
    align-items: center;
    border-radius: 50%;
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
    @include respond-above(sm) {
      &:hover {
        cursor: pointer;
      }
    }

    .FilterButton__icon {
      &-container {
        display: flex;
      }
    }
  }

  &--primary {
    background-color: $brand-blue;
    border: 2px solid $brand-blue;
    color: $white;

    .FilterButton__icon {
      border: 2px solid $gray-600;
      background-color: $white;
      color: $brand-blue;
    }

    &.FilterButton--checked {
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
    }

    @include respond-above(sm) {
      &:hover {
        background-color: darken($brand-blue, 10%);
      }
    }
  }

  &--secondary {
    background-color: $brand-red;
    border: 2px solid $brand-red;
    color: $white;

    .FilterButton__icon {
      border: 2px solid $gray-600;
      background-color: $white;
      color: $brand-red;
    }

    &.FilterButton--checked {
      background-color: $white;
      color: $brand-red;

      @include respond-above(sm) {
        &:hover {
          background-color: $gray-200;
          cursor: pointer;

          .FilterButton__icon {
            background-color: $gray-200;
          }
        }
      }
    }

    @include respond-above(sm) {
      &:hover {
        background-color: darken($brand-red, 10%);
      }
    }
  }
}
</style>

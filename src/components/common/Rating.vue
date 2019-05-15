<template>
  <div class="Rating">
    <Icon
      class="Rating__icon"
      v-for="(star, index) in outOf"
      v-bind:key="index"
      v-bind:icon="getIcon(index)"
      v-bind:icon-family="getIconFamily(index)"
    />
    <div class="Rating__text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import Icon from "./Icon.vue";

@Component({
  components: {
    Icon
  }
})
export default class Rating extends Vue {
  @Prop() private rating!: number;
  @Prop() private outOf!: number;

  private getIcon(index: number): string {
    if (index + 1 <= this.rating || index + 1 - this.rating >= 0.6) {
      return "star";
    }

    return "star-half-alt";
  }

  private getIconFamily(index: number): string {
    if (index + 1 - this.rating >= 0.6) {
      return "far";
    }

    return "fas";
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/breakpoints";

.Rating {
  &__text {
    font-size: $font-size-small;
    margin-top: $margin;
  }

  &__icon {
    color: $brand-blue;
    font-size: 25px;
    margin-right: $margin / 2;

    @include respond-below(ms) {
      font-size: 20px;
      margin-right: $margin / 4;
    }

    @include respond-between(ms, sm) {
      font-size: 25px;
    }
  }
}
</style>

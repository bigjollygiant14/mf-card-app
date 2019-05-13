<template>
  <div class="Rating">
    <Icon
      v-for="(star, index) in outOf"
      v-bind:key="index"
      v-bind:icon="getIcon(index)"
    />
    <br />
    <div class="Rating__text">{{ rating }} / {{ outOf }}</div>
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
    if (index + 1 <= this.rating) {
      return "star";
    }

    if (index + 1 - this.rating <= 0.6) {
      return "star-half";
    }

    return "";
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.Rating {
  &__text {
    font-size: $font-size-small;
    margin-top: $margin;
  }

  .Icon {
    color: $brand-blue;
    font-size: 25px;
    margin-right: $margin / 2;
  }
}
</style>

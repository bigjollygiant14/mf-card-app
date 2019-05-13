<template>
  <div class="FilterButton" v-on:mousedown="$emit('filterbtn-clicked', name)">
    <slot></slot>
    <div class="FilterButton__checked" v-if="checked === true">
      <Icon class="FilterButton__checked-icon" icon="check"></Icon>
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
export default class FilterButton extends Vue {
  @Prop() private checked!: boolean;
  @Prop() private name!: string;
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.FilterButton {
  position: relative;

  &__checked {
    align-items: center;
    background-color: rgba($white, 0.65);
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    &-icon {
      color: $brand-red;
      font-size: $font-size-xlarge;
    }
  }
}
</style>

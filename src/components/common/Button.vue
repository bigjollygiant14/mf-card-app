<template>
  <button
    class="btn"
    v-on:mousedown="$emit('btn-clicked')"
    v-bind:class="{
      'btn--primary': buttonType === 'btnPrimary'
    }"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop() private buttonType!: string;
}
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.btn {
  min-height: 40px;
  min-width: 120px;

  &:focus,
  &:active {
    outline: 0;
  }

  &--primary {
    background-color: $brand-blue;
    border: 1px solid $brand-blue;
    color: $white;
  }
}
</style>

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
.btn {
  &--primary {
  }
}
</style>

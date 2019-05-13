<template>
  <i v-bind:class="getIcon()"></i>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
  @Prop() private icon!: string;

  private getIcon(): string {
    return "Icon fas fa-" + this.icon;
  }
}
</script>

<style lang="scss" scoped>
.Icon {
  font-size: 16px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  width: 25px;
}
</style>

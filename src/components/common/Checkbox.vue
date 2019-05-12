<template>
  <div>
    <label>
      <input type="checkbox" v-model="isChecked" />
      <span>{{ label }}</span>
    </label>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Checkbox extends Vue {
  @Prop() private label!: string;
  @Prop() private checked!: string;

  @Watch("isChecked")
  onChangedInput(val: boolean) {
    this.$emit("input", val);
  }

  private isChecked = this.checked;
}
</script>

<style scoped lang="scss">
.Checkbox {
}
</style>

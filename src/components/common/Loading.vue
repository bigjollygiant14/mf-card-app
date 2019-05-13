<template>
  <div class="Loading" v-if="isLoading" v-cloak>
    <img src="../../assets/spinner.gif" alt="Loading..." />
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop() private isLoading!: boolean;
}
</script>

<style lang="scss">
@import "../../styles/variables";

.Loading {
  background-color: rgba($black, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>

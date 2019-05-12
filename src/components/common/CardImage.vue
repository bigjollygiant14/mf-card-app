<template>
  <img class="CardImage" v-bind:src="src" v-bind:alt="alt" />
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CardImage extends Vue {
  @Prop() private src!: string;
  @Prop() private alt!: string;
}
</script>

<style scoped lang="scss">
.CardImage {
}
</style>

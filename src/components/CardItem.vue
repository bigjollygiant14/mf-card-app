<template>
  <div>{{ card.offer_name }}</div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Helpers
import { CreditCard } from "@/lib";

@Component
export default class CardItem extends Vue {
  @Prop() private card!: CreditCard;
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="CardGroup">
    <h2 class="CardGroup__header">
      {{ mapCardTypeToString(cardGroup.card_type) }} with credit rating of
      {{ mapCreditRatingToString(cardGroup.credit_rating) }}.
    </h2>
    <h4>{{ cardGroup.intro_text }}</h4>
    <div class="CardGroup__card-group" v-if="cardGroup.card1" v-cloak>
      <CardItem
        class="CardGroup__card-group-item"
        v-bind:card="cardGroup.card1"
      />
      <CardItem
        class="CardGroup__card-group-item"
        v-bind:card="cardGroup.card2"
      />
    </div>
    <div
      class="CardGroup__card-list--error"
      v-else
      v-html="cardGroup.error_text"
    ></div>
    <div
      class="CardGroup__cta"
      v-if="cardGroup.cta_text"
      v-html="cardGroup.cta_text"
    ></div>
    <div class="CardGroup__updated accent">
      Updated {{ cardGroup.updated_date }}
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import CardItem from "./CardItem.vue";

// Helpers
import { CreditCardRecommendation } from "@/lib";

@Component({
  components: {
    CardItem
  }
})
export default class CardGroup extends Vue {
  @Prop() private cardGroup!: CreditCardRecommendation;

  private mapCardTypeToString(cardType: string): string {
    const map: any = {
      balance_transfer: "Balance Transfer",
      cash_back: "Cash Back",
      low_interest: "Low Interest",
      travel: "Travel"
    };

    return map[cardType] ? map[cardType] : cardType;
  }

  private mapCreditRatingToString(creditRating: string): string {
    const map: any = {
      excellent: "Excellent",
      goodexcellent: "Good to Excellent",
      good: "Good",
      fair: "Fair",
      bad: "Bad"
    };

    return map[creditRating] ? map[creditRating] : creditRating;
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/breakpoints";

.CardGroup {
  border-bottom: 1px solid rgba($gray-500, 0.6);
  margin-bottom: $margin;
  padding: $padding / 2;

  &__card-group {
    display: flex;
    flex-wrap: wrap;

    @include respond-above(md) {
      flex: 4;
    }

    &-item {
      @include respond-above(md) {
        align-self: flex-start;
        flex: 2;
        margin: $margin * 2;
      }
    }
  }

  &__cta {
    padding: 8px;
    border: 2px solid $gray-300;

    @include respond-above(md) {
      max-width: 700px;
      margin: $margin * 2 auto;
    }
  }

  &__header {
    text-transform: capitalize;
  }

  &__updated {
    margin: $margin 0;
    text-align: right;
  }
}
</style>

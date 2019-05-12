<template>
  <div class="CardItem">
    <div class="CardItem__header">
      <h2 class="CardItem__header-copy">{{ card.offer_name }}</h2>
      <div class="CardItem__header-stars">
        {{ card.star_rating }}
        <a v-bind:href="card.affiliate_link" target="_blank">Apply Now</a>
      </div>
      <div class="CardItem__image-wrapper">
        <CardImage
          class="CardItem__image"
          v-bind:alt="card.offer_name"
          v-bind:src="card.offer_image"
        />
      </div>
    </div>
    <div class="CardItem__ratings">
      <span>{{ card.fees_rating }} / 5</span>
      <span>{{ card.aprs_rating }} / 5</span>
    </div>
    <div class="CardItem__what-we-like">
      <h4>Why We Picked It</h4>
      <p v-html="card.what_we_like"></p>
      <a v-bind:href="card.review_url">Full Review</a>
    </div>
    <div>
      Show More
      <div class="CardItem__card-snapshot">
        <h4>Card Details</h4>
        <div v-if="card.bottom_line" v-cloak v-html="card.bottom_line"></div>
        <div>
          <ul>
            <li>Annual Fee: {{ card.annual_fee }}</li>
            <li>Balance Transfer Fee: {{ card.balance_transfer_fee }}</li>
            <li>Rewards: {{ card.rewards_program }}</li>
            <li>APR: {{ card.regular_apr }}</li>
            <li>Intro Purchase APR: {{ card.intro_purchase_apr }}</li>
            <li>Intro Transfer APR: {{ card.intro_transfer_apr }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="CardItem__marketing">
      <p v-html="card.marketing_bullets"></p>
    </div>
    <div class="CardItem__bonus"></div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";

// Components
import CardImage from "./common/CardImage.vue";

// Helpers
import { CreditCard } from "@/lib";

@Component({
  components: {
    CardImage
  }
})
export default class CardItem extends Vue {
  @Prop() private card!: CreditCard;
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.CardItem {
  &__header {
    font-weight: bold;
    position: relative;
    text-transform: capitalize;

    &-copy {
      width: 80%;
    }

    &-stars {
      display: flex;
      justify-content: space-between;
    }
  }

  &__image {
    height: auto;
    width: 80%;

    &-wrapper {
      text-align: center;
      margin: $margin 0;
    }
  }

  &__ratings {
    display: flex;
    justify-content: space-around;
  }
}
</style>

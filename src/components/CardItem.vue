<template>
  <div class="CardItem">
    <div class="CardItem__header">
      <h2 class="CardItem__header-copy">{{ card.offer_name }}</h2>
      <div class="CardItem__header-rating">
        <Rating v-bind:rating="card.star_rating" v-bind:out-of="5" />
        <div class="CardItem__apply">
          <a
            v-if="card.affiliate_link"
            v-bind:href="card.affiliate_link"
            target="_blank"
          >
            Apply Now
            <Icon icon="chevron-right" />
          </a>
        </div>
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
      <div class="CardItem__sub-rating">
        Fees
        <br />
        <Rating v-bind:rating="card.fees_rating" v-bind:out-of="5" />
      </div>
      <div class="CardItem__sub-rating">
        APR
        <br />
        <Rating v-bind:rating="card.aprs_rating" v-bind:out-of="5" />
      </div>
    </div>

    <div class="CardItem__tabs">
      <vue-tabs>
        <v-tab title="What We Like" class="CardItem__what-we-like">
          <h4>Why We Picked It</h4>
          <p v-html="card.what_we_like"></p>
          <div class="text-right">
            <a v-bind:href="card.review_url">Read Our Full Review</a>
          </div>
        </v-tab>

        <v-tab title="Highlights">
          <h4>Card Highlights</h4>
          <div v-if="card.bottom_line" v-cloak v-html="card.bottom_line"></div>
          <div>
            <ul class="CardItem__card-details-highlights">
              <li>
                <Icon icon="search-dollar" />
                <b>Annual Fee:</b>
                {{ card.annual_fee }}
              </li>
              <li>
                <Icon icon="search-dollar" />
                <b>Balance Transfer Fee:</b>
                {{ card.balance_transfer_fee }}
              </li>
              <li>
                <Icon icon="search-dollar" />
                <b>Rewards:</b>
                {{ card.rewards_program }}
              </li>
              <li>
                <Icon icon="search-dollar" />
                <b>APR:</b>
                {{ card.regular_apr }}
              </li>
              <li>
                <Icon icon="search-dollar" />
                <b>Intro Purchase APR:</b>
                {{ card.intro_purchase_apr }}
              </li>
              <li>
                <Icon icon="search-dollar" />
                <b>Intro Transfer APR:</b>
                {{ card.intro_transfer_apr }}
              </li>
            </ul>
          </div>
        </v-tab>

        <v-tab title="Nitty Gritty" class="CardItem__marketing">
          <h4>The Nitty Gritty</h4>
          <p v-html="card.marketing_bullets"></p>
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Prop, Vue } from "vue-property-decorator";
import { VueTabs, VTab } from "vue-nav-tabs";

// Components
import CardImage from "./common/CardImage.vue";
import Icon from "./common/Icon.vue";
import Rating from "./common/Rating.vue";

// Helpers
import { CreditCard } from "@/lib";

@Component({
  components: {
    CardImage,
    Icon,
    Rating,
    VueTabs,
    VTab
  }
})
export default class CardItem extends Vue {
  @Prop() private card!: CreditCard;
}
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/breakpoints";

.CardItem {
  box-shadow: 0px 4px 16px 4px rgba($black, 0.25);
  border-radius: $border-radius;
  margin: $margin * 2 0;
  padding: $padding;
  width: 100%;

  &__apply {
    font-size: $font-size-large;

    @include respond-above(sm) {
      width: 100%;
    }
  }

  &__card-details {
    &-highlights {
      li {
        list-style-type: none;

        .Icon {
          color: $brand-red;
          height: 16px;
          margin-right: $margin;
          width: 16px;
        }
      }
    }
  }

  &__header {
    font-weight: bold;
    position: relative;
    text-transform: capitalize;

    @include respond-above(sm) {
      display: flex;
      flex-wrap: wrap;
      margin: 0 $margin * 2;
    }

    &-copy {
      width: 80%;

      @include respond-above(sm) {
        width: 100%;
      }
    }

    &-rating {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include respond-above(sm) {
        align-items: flex-start;
        flex-wrap: wrap;
        margin-top: $margin * 4;
        order: 2;
        width: 50%;
      }
    }
  }

  &__image {
    height: auto;
    width: 80%;

    &-wrapper {
      text-align: center;
      margin: $margin 0;

      @include respond-above(sm) {
        order: 3;
        width: 50%;
      }
    }
  }

  &__ratings {
    display: flex;
    flex: 4;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: $margin 0;

    @include respond-above(sm) {
      margin: $margin $margin * 2;
    }
  }

  &__sub-rating {
    flex: 2;
    font-size: $font-size-small;
    text-align: left;

    .Rating {
      .Icon {
        color: $brand-red;
        font-size: $font-size-medium;
        height: $font-size-medium;
        width: $font-size-medium;
      }
    }
  }

  &__tabs {
    ul.nav-tabs {
      display: flex;
      justify-content: space-around;

      li {
        text-align: center;

        &.active {
          color: $brand-red;
        }
      }
    }

    .tab-content {
      padding: $padding;
    }
  }

  &__what-we-like {
    padding: 0 $padding $padding;
    text-align: left;

    li {
      font-weight: bold;
      margin: $margin 0;
      padding: $padding 0;
      list-style-type: none;
    }
  }
}
</style>

<template>
  <div class="CardItem">
    <div class="CardItem__header">
      <h2 class="CardItem__header-copy">{{ card.offer_name }}</h2>
      <div class="CardItem__header-rating">
        <Rating
          class="CardItem__header-rating-stars"
          v-bind:rating="card.star_rating"
          v-bind:out-of="5"
        >
          <p>Overall Rating</p>
        </Rating>
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
      <Rating
        class="CardItem__ratings-stars"
        v-bind:rating="card.star_rating"
        v-bind:out-of="5"
      >
        <p>Overall Rating</p>
      </Rating>
      <div class="CardItem__sub-rating">
        Fees
        <br />
        <Rating v-bind:rating="card.fees_rating" v-bind:out-of="5">
          <p>{{ card.fees_rating }} / 5</p>
        </Rating>
      </div>
      <div class="CardItem__sub-rating">
        APR
        <br />
        <Rating v-bind:rating="card.aprs_rating" v-bind:out-of="5">
          <p>{{ card.aprs_rating }} / 5</p>
        </Rating>
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
      font-size: $font-size-xlarge;
      text-align: right;
      width: 100%;
    }

    .Icon {
      font-size: $font-size-base;

      @include respond-above(sm) {
        font-size: $font-size-large;
      }
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
        flex-wrap: wrap;
        flex-basis: 50%;
        order: 2;
      }

      &-stars {
        @include respond-above(sm) {
          display: none;
        }

        .Rating__icon {
          font-size: 25px;
        }
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
        order: 1;
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
      border-top: 1px solid $gray-300;
      margin: $margin $margin * 2;
      padding: $padding 0;
    }

    &-stars {
      display: none;
      flex-basis: 100%;
      text-align: center;

      @include respond-above(sm) {
        align-items: center;
        display: flex;
        flex-basis: 70%;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      .Icon {
        @include respond-above(sm) {
          font-size: 40px;
          height: 50px;
          line-height: 50px;
          width: 50px;
        }
      }

      .Rating__text {
        @include respond-above(sm) {
          flex-basis: 100%;
        }
      }
    }
  }

  &__sub-rating {
    flex: 2;
    flex-basis: 50%;
    font-size: $font-size-small;
    text-align: left;

    &:last-child {
      text-align: right;
    }

    @include respond-above(sm) {
      margin-top: $margin * 1.5;
    }

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

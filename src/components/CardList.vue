<template>
  <div class="CardList">
    <h2>What can we help you find in a credit card?</h2>
    <CardFilters
      class="CardList__filters"
      v-bind:card-type-filters="cardTypeFilters"
    />

    <Loading v-bind:is-loading="isLoading" />

    <div class="CardList__error" v-if="error.length > 0">
      <h2>
        "Something has gone horribly wrong"
        <br />- Tim
      </h2>
      <br />We're working on getting this resolved and are sorry for any
      inconvenience.
      <br />
      <div v-for="(error, index) in error" v-bind:key="index">
        <br />
        Status: {{ error.status }}, Message: {{ error.message }}
      </div>
    </div>

    <div v-if="cardRecommendations.length > 0">
      <CardGroup
        v-for="(card, index) in cardRecommendations"
        v-bind:key="index"
        v-bind:card-group="card"
      />
    </div>

    <div class="CardList__scroller" v-show="isVisible">
      <Button
        class="CardList__button"
        buttonType="btnPrimary"
        v-on:btn-clicked="scrollToTop"
      >
        <Icon icon="arrow-up" />
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import orderBy from "lodash.orderby";
import filter from "lodash.filter";

// Components
import Button from "./common/Button.vue";
import CardFilters from "./CardFilters.vue";
import CardGroup from "./CardGroup.vue";
import Loading from "./common/Loading.vue";
import Icon from "./common/Icon.vue";

// Helpers
import { CreditCardRecommendations, Error, EventBus } from "@/lib";

@Component({
  components: {
    Button,
    CardFilters,
    CardGroup,
    Loading,
    Icon
  }
})
export default class CardList extends Vue {
  // To Do: Handle Empty State
  private cardRecommendations: CreditCardRecommendations[] = [];
  private cardRecommendationsFull: CreditCardRecommendations[] = [];
  private appliedFilters: any[] = [];
  private isLoading: boolean = false;
  private error: Error[] = [];
  private isVisible: boolean = false;

  private cardTypeFilters = [
    {
      label: "Balance Transfer",
      name: "balance_transfer",
      checked: false,
      icon: "exchange-alt"
    },
    {
      label: "Low Interest",
      name: "low_interest",
      checked: false,
      icon: "tag"
    },
    {
      label: "Travel",
      name: "travel",
      checked: false,
      icon: "plane-departure"
    },
    {
      label: "Cash Back",
      name: "cash_back",
      checked: false,
      icon: "hand-holding-usd"
    }
  ];

  private async getCardData(): Promise<void> {
    this.isLoading = true;
    try {
      this.cardRecommendationsFull = await this.getCardDataFromService();
      this.cardRecommendations = this.sortCards(this.cardRecommendationsFull);
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = [
        ...this.error,
        { status: err.status, message: err.message }
      ];
    }
  }

  private getCardDataFromService(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (process.env.VUE_APP_ENV !== "stage") {
        const api = process.env.VUE_APP_API_URL;
        axios
          .get(api + "/creditcardrecommendations/")
          .then(function(response) {
            if (response.status === 200) {
              resolve(response.data);
            }
          })
          .catch(function(error) {
            reject(error);
          });
      } else {
        setTimeout(() => {
          axios
            .get(
              process.env.VUE_APP_API_URL + "/CreditCardRecommendations.json"
            )
            .then(function(response) {
              if (response.status === 200) {
                resolve(response.data);
              }
            })
            .catch(function(error) {
              reject(error);
            });
        }, 500);
      }
    });
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  private handleScroll(event: any): void {
    event.preventDefault();
    this.isVisible =
      ((document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop) >=
      0.2 * window.innerHeight;
  }

  private sortCards(
    cardList: CreditCardRecommendations[]
  ): CreditCardRecommendations[] {
    return orderBy(cardList, ["card_type", "credit_rating"], ["asc", "desc"]);
  }

  private filterCards(
    cardList: CreditCardRecommendations[],
    name: string
  ): CreditCardRecommendations[] {
    return filter(cardList, card => {
      return card.card_type === name;
    });
  }

  private handleFilterApply(name: string): void {
    const index = this.cardTypeFilters.findIndex(card => {
      return card.name === name;
    });
    // Apply Check
    this.cardTypeFilters[index].checked = !this.cardTypeFilters[index].checked;

    // Get Strings of applied Checks
    let newArray = filter(this.cardTypeFilters, filter => {
      return filter.checked === true;
    }).map(filter => {
      return filter.name;
    });

    // Build New Array of Filtered Cards to Display
    this.cardRecommendations = [];
    for (let i = 0; i < newArray.length; i++) {
      let filteredArray = this.filterCards(this.cardRecommendationsFull, name);
      this.cardRecommendations = this.cardRecommendations.concat(filteredArray);
    }

    // Sort
    this.cardRecommendations = this.sortCards(this.cardRecommendations);
  }

  private mounted(): void {
    this.getCardData();
    window.addEventListener("scroll", this.handleScroll);

    EventBus.$on("apply-filter", this.handleFilterApply);
  }

  private destroyed(): void {
    window.removeEventListener("scroll", this.handleScroll);

    EventBus.$off("apply-filter", this.handleFilterApply);
  }
}
</script>

<style lang="scss">
@import "../styles/variables";

.CardList {
  position: relative;

  &__button {
    &.btn--primary {
      min-width: 40px;
    }
  }

  &__filters {
    border-bottom: 1px solid $gray-400;
    margin-bottom: $margin * 2;
    padding: $padding 0 $padding * 2;

    h3 {
      width: 100%;
    }
  }

  &__error {
    text-align: center;

    h2 {
      color: $brand-red;
    }
  }

  &__scroller {
    display: flex;
    position: fixed;
    bottom: 20px;
    right: 30px;
  }
}
</style>

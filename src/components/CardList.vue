<template>
  <div class="CardList">
    <CardFilters />

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
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

// Components
import CardFilters from "./CardFilters.vue";
import CardGroup from "./CardGroup.vue";
import Loading from "./common/Loading.vue";

// Helpers
import { CreditCardRecommendations, Error } from "@/lib";

@Component({
  components: {
    CardFilters,
    CardGroup,
    Loading
  }
})
export default class CardList extends Vue {
  // To Do:
  // Handle Empty State
  // Sort by good credit first
  private cardRecommendations: CreditCardRecommendations[] = [];
  private isLoading: boolean = false;
  private error: Error[] = [];

  private async getCardData(): Promise<void> {
    // To Do: Handle Loading State
    this.isLoading = true;
    try {
      this.cardRecommendations = await this.getCardDataFromService();
      // this.error = [...this.error, {status: '500', message: "Bad Gateway"}]
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      this.error = [
        ...this.error,
        { status: err.status, message: err.message }
      ];
    }
  }

  // To Do: Move To Helper?
  private getCardDataFromService(): Promise<any> {
    // To Do: Update to Response Body Type instead of Any
    return new Promise<any>((resolve, reject) => {
      // To Do: Add Prod Settings
      axios
        .get("FOOL_API/creditcardrecommendations/")
        .then(function(response) {
          if (response.status === 200) {
            resolve(response.data);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  private mounted(): void {
    this.getCardData();
  }
}
</script>

<style scoped lang="scss">
@import "../styles/variables";

.CardList {
  &__error {
    text-align: center;

    h2 {
      color: $brand-red;
    }
  }
}
</style>

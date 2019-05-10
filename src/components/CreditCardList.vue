<template>
  <div class="CreditCardList">
    <div>Credit Card List</div>
    <div v-for="(card, index) in creditCardRecommendations" v-bind:key="index">
      {{ card.updated_date }}
    </div>
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

// Helpers
import { CreditCardRecommendations } from "@/lib";

@Component
export default class CreditCardList extends Vue {
  // To Do: Handle Empty State
  private creditCardRecommendations: CreditCardRecommendations[] = [];

  private async getCardData(): Promise<void> {
    // To Do: Handle Loading State
    try {
      this.creditCardRecommendations = await this.getCardDataFromService();
    } catch (err) {
      // To Do: Handle Errors
      console.log(err);
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
          // Question: More statuses?
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

<style scoped lang="scss"></style>

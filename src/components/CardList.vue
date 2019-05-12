<template>
  <div class="CardList">
    <CardFilters />
    <CardGroup
      v-for="(card, index) in cardRecommendations"
      v-bind:key="index"
      v-bind:card-group="card"
    />
  </div>
</template>

<script lang="ts">
// Vendor
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

// Components
import CardFilters from "./CardFilters.vue";
import CardGroup from "./CardGroup.vue";

// Helpers
import { CreditCardRecommendations } from "@/lib";

@Component({
  components: {
    CardFilters,
    CardGroup
  }
})
export default class CardList extends Vue {
  // To Do:
  // Handle Empty State
  // Sort by good credit first
  private cardRecommendations: CreditCardRecommendations[] = [];

  private async getCardData(): Promise<void> {
    // To Do: Handle Loading State
    try {
      this.cardRecommendations = await this.getCardDataFromService();
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

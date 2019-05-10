export interface CreditCardRecommendation {
  id: number;
  label: string;
  key: any;
}

export interface CreditCardRecommendations
  extends Array<CreditCardRecommendation> {}

export interface CreditCardRecommendation {
  card1: string;
  card2: string;
  card_type: string;
  cta_text: string;
  credit_rating: string;
  error_text: string;
  intro_text: string;
  updated_date: string;
}

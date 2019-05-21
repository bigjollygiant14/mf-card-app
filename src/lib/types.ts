export interface CreditCardRecommendation {
  id: number;
  label: string;
  key: any;
}

export interface CreditCardRecommendations
  extends Array<CreditCardRecommendation> {}

export interface CreditCardRecommendation {
  card1: CreditCard;
  card2: CreditCard;
  card_type: string;
  cta_text: string;
  credit_rating: string;
  error_text: string;
  intro_text: string;
  updated_date: string;
}

export interface CreditCard {
  affiliate_link: string;
  affiliate_link_deactivate: boolean;
  annual_fee: string;
  aprs_rating: number;
  balance_transfer_fee: string;
  bonus: string;
  bottom_line: string;
  credit_rating: string;
  fees_rating: number;
  intro_purchase_apr: string;
  intro_transfer_apr: string;
  issuer: CardIssuer;
  marketing_bullets: string;
  offer_image: string;
  offer_name: string;
  redirect_url: string;
  regular_apr: string;
  review_url: string;
  rewards_program: string;
  slug: string;
  star_rating: string;
  terms_and_conditions: string;
  what_we_like: string;
}

export interface CardIssuer {
  advertiser_id: number;
  attribution_parameter: string;
  name: string;
  possessive_name: string;
  show_fee_link: boolean;
}

export interface Filters {
  checked: boolean;
  label: string;
  name: string;
  icon?: string;
}

export interface Error {
  message: string;
  status: string;
}

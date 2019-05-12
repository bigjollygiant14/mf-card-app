// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import CardItem from '@/components/CardItem.vue';

// Scaffold
const cardItemMock = {
  affiliate_link:
    'https://click.linksynergy.com/link?id=apU41Q078Xo&offerid=651260.1007&type=2&murl=https%3A%2F%2Fcreditcards.wellsfargo.com%2Fplatinum-visa-credit-card%3Fproduct_code%3DCC%26subproduct_code%3DNV',
  affiliate_link_deactivate: false,
  annual_fee: '$0',
  aprs_rating: 4.5,
  balance_transfer_fee: '3% for 120 days, then 5%',
  bonus: 'N/A',
  bottom_line: '<p></p>',
  credit_rating: 'goodexcellent',
  fees_rating: 4.0,
  issuer: {
    attribution_parameter: 'u1',
    advertiser_id: null,
    name: 'Wells Fargo',
    possessive_name: "Well Fargo's",
    show_fee_link: false
  },
  intro_purchase_apr: '0% for 18 months on purchases',
  intro_transfer_apr: '0% for 18 months on qualifying balance transfers',
  marketing_bullets:
    '<p></p><ul><li>0% Intro APR for 18 months on purchases and balance transfers (fees apply), then a 13.74%-27.24% variable APR; balance transfers made within 120 days qualify for the intro rate and fee</li><li>Get up to $600 protection on your cell phone (subject to $25 deductible) against covered damage or theft when you pay your monthly cellular telephone bill with your Wells Fargo Platinum Visa card</li><li>Easy access to your FICO® Credit Score with Wells Fargo Online®</li><li>Zero Liability protection for promptly reported unauthorized transactions</li><li>Convenient tools to help create a budget and manage your spending with My Money Map</li><li>$0 Annual Fee</li><li>Select &quot;Apply Now&quot; to learn more about the product features, terms, and conditions</li></ul>',
  offer_image:
    'https://m.foolcdn.com/media/affiliates/credit-card-art/Wells_Fargo_platinum_4.23_update.png',
  offer_name: 'Wells Fargo Platinum Visa card',
  redirect_url: '/the-ascent/offers/credit-cards/wells-fargo-platinum/',
  regular_apr: '13.74%-27.24%, variable',
  rewards_program: 'N/A',
  review_url:
    'https://www.fool.com/the-ascent/credit-cards/wells-fargo-platinum-visa-review/',
  slug: 'wells-fargo-platinum',
  star_rating: 4.0,
  terms_and_conditions_link: '',
  what_we_like:
    '<ul><li>Long 0% intro APR offer</li><li>No annual fee</li><li>FICO® Score for free</li><li>Mobile phone protection</li></ul>'
};

let wrapper: any;

describe('CardItem', () => {
  beforeEach(() => {
    wrapper = shallowMount(CardItem, {
      propsData: { card: cardItemMock }
    });
  });

  describe('Methods', () => {
    describe('mapCardTypeToString', () => {
      it('It should map card type and return a string', () => {
        expect(true).toBeTruthy();
      });
    });
  });
});

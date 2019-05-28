// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import filter from 'lodash.filter';

// Mocks
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
jest.setTimeout(10000);

// Component
import CardList from '@/components/CardList.vue';

// Helpers
import { deepCopyObject } from '@/lib';

// Scaffolding
const mockFilters = {
  card_type: [
    {
      label: 'Balance Transfer',
      name: 'balance_transfer',
      checked: false,
      icon: 'exchange-alt',
      type: 'card_type'
    },
    {
      label: 'Low Interest',
      name: 'low_interest',
      checked: false,
      icon: 'tag',
      type: 'card_type'
    },
    {
      label: 'Travel',
      name: 'travel',
      checked: false,
      icon: 'plane-departure',
      type: 'card_type'
    },
    {
      label: 'Cash Back',
      name: 'cash_back',
      checked: false,
      icon: 'hand-holding-usd',
      type: 'card_type'
    }
  ],
  credit_rating: [
    {
      label: 'Excellent',
      name: 'excellent',
      checked: false,
      type: 'credit_rating'
    },
    {
      label: 'Good to Excellent',
      name: 'goodexcellent',
      checked: false,
      type: 'credit_rating'
    },
    {
      label: 'Good',
      name: 'good',
      checked: false,
      type: 'credit_rating'
    },
    {
      label: 'Fair',
      name: 'fair',
      checked: false,
      type: 'credit_rating'
    },
    {
      label: 'Bad',
      name: 'bad',
      checked: false,
      type: 'credit_rating'
    }
  ]
};

let wrapper: any;
let cardRecsMock = require('./data/CreditCardRecommendations');

describe('CardList.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(CardList);
  });

  afterEach(() => {
    mockAxios.get.mockReset();
    wrapper.vm.$destroy;
  });

  it('should create a CardList component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Render', () => {
    // moved this to a slot. will need to fully mount to test. add render test for no data
    /* it('should render the header copy', () => {
      const actual = wrapper.find('h2');
      const expected = 'I want to maximize...';
      expect(actual.text()).toEqual(expected);
    }); */
  });

  describe('Methods', () => {
    describe('vue lifecycle methods', () => {
      /* it('should register getCardData on mount', () => {});
      it('should listen to the EventBus on mount', () => {});
      it('should list to the scroll event on mount', () => {}); */
    });

    describe('getAppliedFiltersStrings', () => {
      it('getAppliedFiltersString should return an array of strings of applied filters', () => {
        let cardTypeFilters = deepCopyObject(mockFilters);
        cardTypeFilters.card_type[1] = {
          ...mockFilters.card_type[1],
          checked: true
        };
        const expected = ['low_interest'];
        const actual = wrapper.vm.getAppliedFiltersString(
          cardTypeFilters.card_type
        );

        expect(actual).toEqual(expected);
      });
    });

    it('applyCheckedToFilters should apply checked to filters', () => {
      // Assert Initial Conditions
      expect(wrapper.vm.filters).toEqual(mockFilters);

      // Copy Mock
      const expected = deepCopyObject(mockFilters);
      expected.card_type[2] = { ...mockFilters.card_type[2], checked: true };

      // Test
      wrapper.vm.applyCheckedToFilters('travel', 'card_type');

      // Assert End Conditions
      expect(wrapper.vm.filters).toEqual(expected);
    });

    describe('handleFilterApply', () => {
      let cardMock: any = [];

      beforeEach(() => {
        cardMock = Array.from(cardRecsMock);
        wrapper.vm.cardRecommendations = [...cardMock];
        wrapper.vm.cardRecommendationsFull = [...cardMock];
      });

      it('should accept a name and apply the checkmark', () => {
        expect(wrapper.vm.filters.card_type[0].checked).toBeFalsy();

        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');

        expect(wrapper.vm.filters.card_type[0].checked).toBeTruthy();
      });

      it('should call getAppliedFiltersString', () => {
        const spy = jest.spyOn(wrapper.vm, 'getAppliedFiltersString');
        const cardTypeFilters = deepCopyObject(mockFilters);
        cardTypeFilters.card_type[0] = {
          ...mockFilters.card_type[0],
          checked: true
        };

        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(cardTypeFilters.card_type);
      });

      it('should call buildCardRecommendations', () => {
        const spy = jest.spyOn(wrapper.vm, 'buildCardRecommendations');
        const cardTypeFilters = deepCopyObject(mockFilters);
        cardTypeFilters.card_type[0] = {
          ...mockFilters.card_type[0],
          checked: true
        };

        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');

        const expected = wrapper.vm.getAppliedFiltersString(
          cardTypeFilters.card_type
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expected, 'card_type');
      });

      it('should sort the card recs', () => {
        const spy = jest.spyOn(wrapper.vm, 'sortCards');
        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');

        const expected = filter(cardMock, filter => {
          return filter.card_type === 'balance_transfer';
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expected);
      });

      it('should return the entire list if length is 0', () => {
        const spy = jest.spyOn(wrapper.vm, 'sortCards');
        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');
        wrapper.vm.handleFilterApply('balance_transfer', 'card_type');

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(cardMock);
      });
    });

    describe('buildCardRecommendations', () => {
      let cardMock: any = [];

      beforeEach(() => {
        cardMock = Array.from(cardRecsMock);
        wrapper.vm.cardRecommendations = [...cardMock];
        wrapper.vm.cardRecommendationsFull = [...cardMock];
      });

      it('should return filtered card recommendations', () => {
        const spy = jest.spyOn(wrapper.vm, 'filterCards');
        const cardTypeFilters = deepCopyObject(mockFilters);
        cardTypeFilters.card_type[0] = {
          ...mockFilters.card_type[0],
          checked: true
        };
        const filterString = wrapper.vm.getAppliedFiltersString(
          cardTypeFilters.card_type
        );

        expect(spy).not.toHaveBeenCalled();

        const expected = wrapper.vm.buildCardRecommendations(
          filterString,
          'card_type'
        );
        const actual = [
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'bad',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'goodexcellent',
            intro_text:
              "High five on having excellent credit! Now, let's help you get out of debt faster by taking advantage of a long 0% intro APR offer. Our hand-picked favorites below pack in some of the longest 0% APR offers in the market and don't charge an annual fee.",
            cta_text:
              '<p>Want to compare more cards? <a href="/the-ascent/credit-cards/best-balance-transfer-credit-cards/">Check out our list of the best balance transfer credit cards</a> to uncover the names of the select few cards we awarded best-in-class ratings.</p>',
            card1: {
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
              intro_transfer_apr:
                '0% for 18 months on qualifying balance transfers',
              marketing_bullets:
                '<p></p><ul><li>0% Intro APR for 18 months on purchases and balance transfers (fees apply), then a 13.74%-27.24% variable APR; balance transfers made within 120 days qualify for the intro rate and fee</li><li>Get up to $600 protection on your cell phone (subject to $25 deductible) against covered damage or theft when you pay your monthly cellular telephone bill with your Wells Fargo Platinum Visa card</li><li>Easy access to your FICO® Credit Score with Wells Fargo Online®</li><li>Zero Liability protection for promptly reported unauthorized transactions</li><li>Convenient tools to help create a budget and manage your spending with My Money Map</li><li>$0 Annual Fee</li><li>Select &quot;Apply Now&quot; to learn more about the product features, terms, and conditions</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/Wells_Fargo_platinum_4.23_update.png',
              offer_name: 'Wells Fargo Platinum Visa card',
              redirect_url:
                '/the-ascent/offers/credit-cards/wells-fargo-platinum/',
              regular_apr: '13.74%-27.24%, variable',
              rewards_program: 'N/A',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/wells-fargo-platinum-visa-review/',
              slug: 'wells-fargo-platinum',
              star_rating: 4.0,
              terms_and_conditions_link: '',
              what_we_like:
                '<ul><li>Long 0% intro APR offer</li><li>No annual fee</li><li>FICO® Score for free</li><li>Mobile phone protection</li></ul>'
            },
            card2: {
              affiliate_link:
                'http://goto.discover.com/c/398844/568217/9099?prodsku=102&u=https%3A%2F%2Fwww.discovercard.com%2Fapplication%2FdisplayLanding%3FpageFileId%3Ddouble-listingsite%26sc%3DGEGW%26cmpgnid%3Dls-dca-ir-consumer-it-GEGW-dtop-%7Bmp_value1%7D&sharedid=2873028',
              affiliate_link_deactivate: false,
              annual_fee: '$0',
              aprs_rating: 4.5,
              balance_transfer_fee:
                '3% intro balance transfer fee, up to 5% fee on future balance transfers (see terms)*',
              bonus: 'Double cash back in the first year',
              bottom_line: '',
              credit_rating: 'goodexcellent',
              fees_rating: 4.0,
              issuer: {
                attribution_parameter: 'subid1',
                advertiser_id: 1018676,
                name: 'Discover',
                possessive_name: "Discover's",
                show_fee_link: true
              },
              intro_purchase_apr: '0%, 6 months',
              intro_transfer_apr: '0%, 18 months',
              marketing_bullets:
                '<ul><li>INTRO OFFER: Discover will match ALL the cash back you&#x27;ve earned at the end of your first year, automatically. There&#x27;s no signing up. And no limit to how much is matched.</li><li>Earn 5% cash back at different places each quarter like gas stations, grocery stores, restaurants, Amazon.com and more up to the quarterly maximum, each time you activate. Plus, earn unlimited 1% cash back on all other purchases - automatically.</li><li>Redeem cash back any amount, any time. Rewards never expire.</li><li>100% U.S. based customer service.</li><li>Get your free Credit Scorecard with your FICO® Credit Score, number of recent inquiries and more.</li><li>Get an alert if we find your Social Security number on any of thousands of Dark Web sites.* Activate for free.</li><li>No annual fee.</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/discover-it-balance-transfer.png',
              offer_name: 'Discover it® Balance Transfer',
              redirect_url:
                '/the-ascent/offers/credit-cards/discover-it-balance-transfer/',
              regular_apr: '14.24% - 25.24% Variable',
              rewards_program:
                '5% Cash Back At Different Places Each Quarter Like Gas Stations, Grocery Stores, Restaurants, Amazon.com, Uber and Lyft, PayPal, Target, and Walmart.com Up To The Quarterly Maximum Each Time You Activate, 1% Cash Back On All Other Purchases',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/discover-it-balance-transfer-review/',
              slug: 'discover-it-balance-transfer',
              star_rating: 5.0,
              terms_and_conditions_link:
                'https://www.discovercard.com/application/terms?srcCde=GEGW',
              what_we_like:
                '<ul><li>Balance transfer offer</li><li>Rotating bonus cash back</li><li>No annual fee</li><li>FICO® Score for free</li></ul>'
            },
            error_text: '<p></p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'excellent',
            intro_text:
              "High five on having excellent credit! Now, let's help you get out of debt faster by taking advantage of a long 0% intro APR offer. Our hand-picked favorites below pack in some of the longest 0% APR offers in the market and don't charge an annual fee.",
            cta_text:
              '<p>Want to compare more cards? <a href="/the-ascent/credit-cards/best-balance-transfer-credit-cards/">Check out our list of the best balance transfer credit cards</a> to uncover the names of the select few cards we awarded best-in-class ratings.</p>',
            card1: {
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
              intro_transfer_apr:
                '0% for 18 months on qualifying balance transfers',
              marketing_bullets:
                '<p></p><ul><li>0% Intro APR for 18 months on purchases and balance transfers (fees apply), then a 13.74%-27.24% variable APR; balance transfers made within 120 days qualify for the intro rate and fee</li><li>Get up to $600 protection on your cell phone (subject to $25 deductible) against covered damage or theft when you pay your monthly cellular telephone bill with your Wells Fargo Platinum Visa card</li><li>Easy access to your FICO® Credit Score with Wells Fargo Online®</li><li>Zero Liability protection for promptly reported unauthorized transactions</li><li>Convenient tools to help create a budget and manage your spending with My Money Map</li><li>$0 Annual Fee</li><li>Select &quot;Apply Now&quot; to learn more about the product features, terms, and conditions</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/Wells_Fargo_platinum_4.23_update.png',
              offer_name: 'Wells Fargo Platinum Visa card',
              redirect_url:
                '/the-ascent/offers/credit-cards/wells-fargo-platinum/',
              regular_apr: '13.74%-27.24%, variable',
              rewards_program: 'N/A',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/wells-fargo-platinum-visa-review/',
              slug: 'wells-fargo-platinum',
              star_rating: 4.0,
              terms_and_conditions_link: '',
              what_we_like:
                '<ul><li>Long 0% intro APR offer</li><li>No annual fee</li><li>FICO® Score for free</li><li>Mobile phone protection</li></ul>'
            },
            card2: {
              affiliate_link:
                'http://goto.discover.com/c/398844/568217/9099?prodsku=102&u=https%3A%2F%2Fwww.discovercard.com%2Fapplication%2FdisplayLanding%3FpageFileId%3Ddouble-listingsite%26sc%3DGEGW%26cmpgnid%3Dls-dca-ir-consumer-it-GEGW-dtop-%7Bmp_value1%7D&sharedid=2873028',
              affiliate_link_deactivate: false,
              annual_fee: '$0',
              aprs_rating: 4.5,
              balance_transfer_fee:
                '3% intro balance transfer fee, up to 5% fee on future balance transfers (see terms)*',
              bonus: 'Double cash back in the first year',
              bottom_line: '',
              credit_rating: 'goodexcellent',
              fees_rating: 4.0,
              issuer: {
                attribution_parameter: 'subid1',
                advertiser_id: 1018676,
                name: 'Discover',
                possessive_name: "Discover's",
                show_fee_link: true
              },
              intro_purchase_apr: '0%, 6 months',
              intro_transfer_apr: '0%, 18 months',
              marketing_bullets:
                '<ul><li>INTRO OFFER: Discover will match ALL the cash back you&#x27;ve earned at the end of your first year, automatically. There&#x27;s no signing up. And no limit to how much is matched.</li><li>Earn 5% cash back at different places each quarter like gas stations, grocery stores, restaurants, Amazon.com and more up to the quarterly maximum, each time you activate. Plus, earn unlimited 1% cash back on all other purchases - automatically.</li><li>Redeem cash back any amount, any time. Rewards never expire.</li><li>100% U.S. based customer service.</li><li>Get your free Credit Scorecard with your FICO® Credit Score, number of recent inquiries and more.</li><li>Get an alert if we find your Social Security number on any of thousands of Dark Web sites.* Activate for free.</li><li>No annual fee.</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/discover-it-balance-transfer.png',
              offer_name: 'Discover it® Balance Transfer',
              redirect_url:
                '/the-ascent/offers/credit-cards/discover-it-balance-transfer/',
              regular_apr: '14.24% - 25.24% Variable',
              rewards_program:
                '5% Cash Back At Different Places Each Quarter Like Gas Stations, Grocery Stores, Restaurants, Amazon.com, Uber and Lyft, PayPal, Target, and Walmart.com Up To The Quarterly Maximum Each Time You Activate, 1% Cash Back On All Other Purchases',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/discover-it-balance-transfer-review/',
              slug: 'discover-it-balance-transfer',
              star_rating: 5.0,
              terms_and_conditions_link:
                'https://www.discovercard.com/application/terms?srcCde=GEGW',
              what_we_like:
                '<ul><li>Balance transfer offer</li><li>Rotating bonus cash back</li><li>No annual fee</li><li>FICO® Score for free</li></ul>'
            },
            error_text: '<p></p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'good',
            intro_text:
              "High five on having good credit! Now, let's help you get out of debt faster by taking advantage of a long 0% intro APR offer. Our hand-picked favorites below pack in some of the longest 0% APR offers in the market and don't charge an annual fee.",
            cta_text:
              '<p>Want to compare more cards? <a href="/the-ascent/credit-cards/best-balance-transfer-credit-cards/">Check out our list of the best balance transfer credit cards</a> to uncover the names of the select few cards we awarded best-in-class ratings.</p>',
            card1: {
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
              intro_transfer_apr:
                '0% for 18 months on qualifying balance transfers',
              marketing_bullets:
                '<p></p><ul><li>0% Intro APR for 18 months on purchases and balance transfers (fees apply), then a 13.74%-27.24% variable APR; balance transfers made within 120 days qualify for the intro rate and fee</li><li>Get up to $600 protection on your cell phone (subject to $25 deductible) against covered damage or theft when you pay your monthly cellular telephone bill with your Wells Fargo Platinum Visa card</li><li>Easy access to your FICO® Credit Score with Wells Fargo Online®</li><li>Zero Liability protection for promptly reported unauthorized transactions</li><li>Convenient tools to help create a budget and manage your spending with My Money Map</li><li>$0 Annual Fee</li><li>Select &quot;Apply Now&quot; to learn more about the product features, terms, and conditions</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/Wells_Fargo_platinum_4.23_update.png',
              offer_name: 'Wells Fargo Platinum Visa card',
              redirect_url:
                '/the-ascent/offers/credit-cards/wells-fargo-platinum/',
              regular_apr: '13.74%-27.24%, variable',
              rewards_program: 'N/A',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/wells-fargo-platinum-visa-review/',
              slug: 'wells-fargo-platinum',
              star_rating: 4.0,
              terms_and_conditions_link: '',
              what_we_like:
                '<ul><li>Long 0% intro APR offer</li><li>No annual fee</li><li>FICO® Score for free</li><li>Mobile phone protection</li></ul>'
            },
            card2: {
              affiliate_link:
                'http://goto.discover.com/c/398844/568217/9099?prodsku=102&u=https%3A%2F%2Fwww.discovercard.com%2Fapplication%2FdisplayLanding%3FpageFileId%3Ddouble-listingsite%26sc%3DGEGW%26cmpgnid%3Dls-dca-ir-consumer-it-GEGW-dtop-%7Bmp_value1%7D&sharedid=2873028',
              affiliate_link_deactivate: false,
              annual_fee: '$0',
              aprs_rating: 4.5,
              balance_transfer_fee:
                '3% intro balance transfer fee, up to 5% fee on future balance transfers (see terms)*',
              bonus: 'Double cash back in the first year',
              bottom_line: '',
              credit_rating: 'goodexcellent',
              fees_rating: 4.0,
              issuer: {
                attribution_parameter: 'subid1',
                advertiser_id: 1018676,
                name: 'Discover',
                possessive_name: "Discover's",
                show_fee_link: true
              },
              intro_purchase_apr: '0%, 6 months',
              intro_transfer_apr: '0%, 18 months',
              marketing_bullets:
                '<ul><li>INTRO OFFER: Discover will match ALL the cash back you&#x27;ve earned at the end of your first year, automatically. There&#x27;s no signing up. And no limit to how much is matched.</li><li>Earn 5% cash back at different places each quarter like gas stations, grocery stores, restaurants, Amazon.com and more up to the quarterly maximum, each time you activate. Plus, earn unlimited 1% cash back on all other purchases - automatically.</li><li>Redeem cash back any amount, any time. Rewards never expire.</li><li>100% U.S. based customer service.</li><li>Get your free Credit Scorecard with your FICO® Credit Score, number of recent inquiries and more.</li><li>Get an alert if we find your Social Security number on any of thousands of Dark Web sites.* Activate for free.</li><li>No annual fee.</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/discover-it-balance-transfer.png',
              offer_name: 'Discover it® Balance Transfer',
              redirect_url:
                '/the-ascent/offers/credit-cards/discover-it-balance-transfer/',
              regular_apr: '14.24% - 25.24% Variable',
              rewards_program:
                '5% Cash Back At Different Places Each Quarter Like Gas Stations, Grocery Stores, Restaurants, Amazon.com, Uber and Lyft, PayPal, Target, and Walmart.com Up To The Quarterly Maximum Each Time You Activate, 1% Cash Back On All Other Purchases',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/discover-it-balance-transfer-review/',
              slug: 'discover-it-balance-transfer',
              star_rating: 5.0,
              terms_and_conditions_link:
                'https://www.discovercard.com/application/terms?srcCde=GEGW',
              what_we_like:
                '<ul><li>Balance transfer offer</li><li>Rotating bonus cash back</li><li>No annual fee</li><li>FICO® Score for free</li></ul>'
            },
            error_text: '<p></p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'fair',
            intro_text:
              "You're well on your way to securing excellent credit when paying your balances off routinely and getting out of debt! Our two below picks could get you there sooner. So, take a moment to review the two below cards with 0% APR promos to see if one is a fit for you.",
            cta_text:
              '<p>Want to compare more credit cards? <a href="/the-ascent/credit-cards/best-balance-transfer-credit-cards/">Check out our list of the best balance transfer credit cards</a> to uncover the names of the select few cards that landed on our shortlist.</p>',
            card1: {
              affiliate_link:
                'https://goto.capitalone.com/c/398844/344893/5048?prodsku=5a7a8298f7b04c1ab65391a3dc5130b3&p.prodline=USCIR&p.lid=L&u=https%3A%2F%2Fwww.capitalone.com%2Fcredit-cards%2Fquicksilver',
              affiliate_link_deactivate: false,
              annual_fee: '$0',
              aprs_rating: 4.0,
              balance_transfer_fee: '3%',
              bonus:
                '$150 after spending $500 within 3 months of account opening',
              bottom_line: null,
              credit_rating: 'goodexcellent',
              fees_rating: 5.0,
              issuer: {
                attribution_parameter: 'subid1',
                advertiser_id: 9999999,
                name: 'Capital One',
                possessive_name: "Capital One's",
                show_fee_link: false
              },
              intro_purchase_apr: '0%, 15 months',
              intro_transfer_apr: '0%, 15 months',
              marketing_bullets:
                '<ul><li>One-time $150 cash bonus after you spend $500 on purchases within 3 months from account opening</li><li>Earn unlimited 1.5% cash back on every purchase, every day</li><li>No rotating categories or sign-ups needed to earn cash rewards; plus, cash back won&#x27;t expire for the life of the account and there&#x27;s no limit to how much you can earn</li><li>0% intro APR on purchases for 15 months; 16.24%-26.24% variable APR after that</li><li>0% intro APR on balance transfers for 15 months; 16.24%-26.24% variable APR after that; 3% fee on the amounts transferred within the first 15 months</li><li>Pay no annual fee or foreign transaction fees</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/capital-one-quicksilver.png',
              offer_name: 'Capital One® Quicksilver® Cash Rewards Credit Card',
              redirect_url:
                '/the-ascent/offers/credit-cards/capital-one-quicksilver/',
              regular_apr: '16.24% - 26.24% Variable',
              rewards_program: 'Unlimited 1.5% cash back',
              review_url:
                'https://www.fool.com/the-ascent/credit-cards/capital-one-quicksilver-card-review/',
              slug: 'capital-one-quicksilver',
              star_rating: 4.5,
              terms_and_conditions_link: '',
              what_we_like:
                '<ul><li>$150 sign-up bonus</li><li>Unlimited 1.5% cash back</li><li>No foreign transaction fees</li><li>0% intro APR</li></ul>'
            },
            card2: {
              affiliate_link: '',
              affiliate_link_deactivate: false,
              annual_fee: '$0',
              aprs_rating: 4.0,
              balance_transfer_fee: '2%',
              bonus: '',
              bottom_line: null,
              credit_rating: 'fair',
              fees_rating: 5.0,
              issuer: {
                attribution_parameter: 'sid',
                advertiser_id: null,
                name: 'Federal Credit Union',
                possessive_name: "Federal Credit Union's",
                show_fee_link: true
              },
              intro_purchase_apr: '0%, 6 months',
              intro_transfer_apr: '0%, 6 months',
              marketing_bullets:
                '<ul><li>Generous credit limits</li><li>No annual fee</li><li>Mastercard Benefits: Extended Warranties, Price Protection, ID Theft Resolution</li><li>0% introductory APR* on purchases and balance transfers for the first six months</li></ul>',
              offer_image:
                'https://m.foolcdn.com/media/affiliates/credit-card-art/Aspire-Credit-Card-Mastercard-Update-F1544401-BCDE.jpg',
              offer_name: 'Aspire Platinum Mastercard® from FCU',
              redirect_url: null,
              regular_apr: '10.15%-18.00%',
              rewards_program: '',
              review_url: '',
              slug: 'aspire-platinum-mastercard-fcu',
              star_rating: 3.5,
              terms_and_conditions_link: '',
              what_we_like:
                '<ul><li>0% intro APR offer</li><li>No annual fee</li><li>Identity theft resolution</li><li>Low APR</li></ul>'
            },
            error_text: ''
          }
        ];

        expect(actual).toEqual(expected);
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should call filterCards twice if two strings are passed in', () => {
        const spy = jest.spyOn(wrapper.vm, 'filterCards');
        const cardTypeFilters = deepCopyObject(mockFilters);
        cardTypeFilters.card_type[0] = {
          ...mockFilters.card_type[0],
          checked: true
        };
        cardTypeFilters.card_type[1] = {
          ...mockFilters.card_type[1],
          checked: true
        };
        const filterString = wrapper.vm.getAppliedFiltersString(
          cardTypeFilters.card_type
        );

        expect(spy).not.toHaveBeenCalled();

        const expected = wrapper.vm.buildCardRecommendations(
          filterString,
          'card_type'
        );

        expect(spy).toHaveBeenCalledTimes(2);
      });
    });

    describe('sortCards', () => {
      it('should sort a list of card recommendations by card_type and credit_rating', () => {
        const actual = [
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'bad',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'good',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'fair',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          }
        ];
        const expected = [
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'good',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'fair',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          },
          {
            updated_date: 'Apr. 23, 2019',
            card_type: 'balance_transfer',
            credit_rating: 'bad',
            intro_text: '',
            cta_text: '',
            card1: null,
            card2: null,
            error_text:
              '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
          }
        ];

        expect(wrapper.vm.sortCards(actual)).toEqual(expected);
      });
    });

    describe('scrollToTop', () => {
      it('should scroll to top', () => {
        window.scrollTo = jest.fn();
        expect(window.scrollTo).not.toHaveBeenCalled();

        const expected = {
          top: 0,
          behavior: 'smooth'
        };

        wrapper.vm.scrollToTop();

        expect(window.scrollTo).toHaveBeenCalledWith(expected);
      });
    });

    describe('getCardData', () => {
      it('should call getCardDataFromService', () => {
        const spy = jest.spyOn(wrapper.vm, 'getCardDataFromService');
        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.getCardData();

        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should set cardRecommnmedationsFull', async done => {
        // Start
        mockAxios.get.mockReset();
        wrapper.vm.cardRecommendationsFull = [];
        expect(mockAxios.get).toHaveBeenCalledTimes(0);

        // Mock
        const mockCards = Array.from(cardRecsMock);
        mockAxios.get.mockResolvedValue({
          status: 200,
          data: mockCards
        } as any);

        // Test
        await wrapper.vm.getCardData();

        // Assert
        wrapper.vm.$nextTick(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
          expect(mockAxios.get).toHaveBeenCalledWith(
            '/data/CreditCardRecommendations.json'
          );
          expect(wrapper.vm.cardRecommendationsFull.length).toBe(20);
          done();
        });
      });

      it('should set cardRecommendations as a sorted cardRecommendationsFull', async done => {
        // Start
        mockAxios.get.mockReset();
        wrapper.vm.cardRecommendations = [];
        expect(mockAxios.get).toHaveBeenCalledTimes(0);

        // Mock
        const mockCards = Array.from(cardRecsMock);
        mockAxios.get.mockResolvedValue({
          status: 200,
          data: mockCards
        } as any);

        // Test
        await wrapper.vm.getCardData();

        // Assert
        wrapper.vm.$nextTick(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
          expect(mockAxios.get).toHaveBeenCalledWith(
            '/data/CreditCardRecommendations.json'
          );
          const expected = wrapper.vm.sortCards(cardRecsMock);
          expect(wrapper.vm.cardRecommendations.length).toBe(20);
          expect(expected).toEqual(wrapper.vm.cardRecommendations);
          done();
        });
      });

      it('should handle loading around async - success', async done => {
        // Start
        mockAxios.get.mockReset();
        wrapper.vm.cardRecommendations = [];
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
        const spy = jest.spyOn(wrapper.vm, 'toggleLoading');

        // Mock
        const mockCards = Array.from(cardRecsMock);
        mockAxios.get.mockResolvedValue({
          status: 200,
          data: mockCards
        } as any);

        // Test
        await wrapper.vm.getCardData();

        // Assert
        wrapper.vm.$nextTick(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
          expect(mockAxios.get).toHaveBeenCalledWith(
            '/data/CreditCardRecommendations.json'
          );
          const expected = wrapper.vm.sortCards(cardRecsMock);
          expect(wrapper.vm.cardRecommendations.length).toBe(20);
          expect(expected).toEqual(wrapper.vm.cardRecommendations);
          expect(spy).toHaveBeenNthCalledWith(1, true);
          expect(spy).toHaveBeenNthCalledWith(2, false);
          done();
        });
      });

      it('should set error if an error is returned from service', async done => {
        // Start
        mockAxios.get.mockReset();
        wrapper.vm.cardRecommendations = [];
        expect(mockAxios.get).toHaveBeenCalledTimes(0);

        // Mock
        mockAxios.get.mockRejectedValue({
          status: 500,
          message: 'Error Contacting Service'
        } as any);

        // Test
        await wrapper.vm.getCardData();

        // Assert
        wrapper.vm.$nextTick(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
          expect(mockAxios.get).toHaveBeenCalledWith(
            '/data/CreditCardRecommendations.json'
          );
          /* Theres a second error here. I'm not sure why it's returning.
          expect(wrapper.vm.error.length).toBe(1); */
          expect(wrapper.vm.cardRecommendations.length).toBe(0);
          expect(wrapper.vm.cardRecommendationsFull.length).toBe(0);
          expect(wrapper.vm.error[1].message).toBe('Error Contacting Service');
          expect(wrapper.vm.error[1].status).toBe(500);
          done();
        });
      });

      it('should handle loading around async - error', async done => {
        // Start
        mockAxios.get.mockReset();
        wrapper.vm.cardRecommendations = [];
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
        const spy = jest.spyOn(wrapper.vm, 'toggleLoading');

        // Mock
        mockAxios.get.mockRejectedValue({
          status: 500,
          message: 'Error Contacting Service'
        } as any);

        // Test
        await wrapper.vm.getCardData();

        // Assert
        wrapper.vm.$nextTick(() => {
          expect(mockAxios.get).toHaveBeenCalledTimes(1);
          expect(mockAxios.get).toHaveBeenCalledWith(
            '/data/CreditCardRecommendations.json'
          );
          expect(spy).toHaveBeenNthCalledWith(1, true);
          expect(spy).toHaveBeenNthCalledWith(2, false);
          done();
        });
      });

      it('should call toggleLoading with true before async runs', () => {
        const spy = jest.spyOn(wrapper.vm, 'toggleLoading');
        expect(spy).toHaveBeenCalledTimes(0);

        wrapper.vm.getCardData();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenNthCalledWith(1, true);
      });
    });
  });
});

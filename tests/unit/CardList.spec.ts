// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import filter from 'lodash.filter';

// Component
import CardList from '@/components/CardList.vue';

// Scaffolding
const cardTypeFiltersMock = [
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
];

let wrapper: any;
let cardRecsMock = require('./data/CreditCardRecommendations');

describe('CardList.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(CardList);
  });

  afterEach(() => {
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

    it('getAppliedFiltersString should return an array of strings of applied filters', () => {
      let cardTypeFilters = [...cardTypeFiltersMock];
      cardTypeFilters[1] = { ...cardTypeFiltersMock[1], checked: true };
      const expected = ['low_interest'];
      const actual = wrapper.vm.getAppliedFiltersString(cardTypeFilters);

      expect(actual).toEqual(expected);
    });

    it('applyCheckedToFilters should apply checked to filters', () => {
      // Assert Initial Conditions
      expect(wrapper.vm.cardTypeFilters).toEqual(cardTypeFiltersMock);

      // Copy Mock
      const expected = [...cardTypeFiltersMock];
      expected[2] = { ...cardTypeFiltersMock[2], checked: true };

      // Test
      wrapper.vm.applyCheckedToFilters('travel');

      // Assert End Conditions
      expect(wrapper.vm.cardTypeFilters).toEqual(expected);
    });

    describe('handleFilterApply', () => {
      let cardMock: any = [];

      beforeEach(() => {
        cardMock = [...cardRecsMock];
        wrapper.vm.cardRecommendations = [...cardMock];
        wrapper.vm.cardRecommendationsFull = [...cardMock];
      });

      it('should accept a name and apply the checkmark', () => {
        expect(wrapper.vm.cardTypeFilters[0].checked).toBeFalsy();

        wrapper.vm.handleFilterApply('balance_transfer');

        expect(wrapper.vm.cardTypeFilters[0].checked).toBeTruthy();
      });

      it('should call getAppliedFiltersString', () => {
        const spy = jest.spyOn(wrapper.vm, 'getAppliedFiltersString');
        const cardTypeFilters = [...cardTypeFiltersMock];
        cardTypeFilters[0] = { ...cardTypeFiltersMock[0], checked: true };

        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(cardTypeFilters);
      });

      it('should call buildCardRecommendations', () => {
        const spy = jest.spyOn(wrapper.vm, 'buildCardRecommendations');
        const cardTypeFilters = [...cardTypeFiltersMock];
        cardTypeFilters[0] = { ...cardTypeFiltersMock[0], checked: true };

        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer');

        const expected = wrapper.vm.getAppliedFiltersString(
          wrapper.vm.cardTypeFilters
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expected);
      });

      it('should sort the card recs', () => {
        const spy = jest.spyOn(wrapper.vm, 'sortCards');
        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.cardRecommendations = [...cardMock];
        wrapper.vm.cardRecommendationsFull = [...cardMock];

        wrapper.vm.handleFilterApply('balance_transfer');

        const expected = filter(cardMock, filter => {
          return filter.card_type === 'balance_transfer';
        });

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(expected);
      });

      it('should return the entire list if length is 0', () => {
        const spy = jest.spyOn(wrapper.vm, 'sortCards');
        expect(spy).not.toHaveBeenCalled();

        wrapper.vm.handleFilterApply('balance_transfer');
        wrapper.vm.handleFilterApply('balance_transfer');

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(cardMock);
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
  });
});

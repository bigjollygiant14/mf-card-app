// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import CardGroup from '@/components/CardGroup.vue';

// Scaffold
const cardGroupMock = {
  updated_date: 'Apr. 23, 2019',
  card_type: 'balance_transfer',
  credit_rating: 'bad',
  intro_text: '',
  cta_text: '',
  card1: null,
  card2: null,
  error_text:
    '<p>We\'ve not found a balance transfer credit card for bad credit that matches with what we think makes financial sense in a credit card, including low fees and a long 0% intro APR offer. But worry not, because you have options, including refinancing your debt to a low rate with a personal loan. <a href="/the-ascent/personal-loans/">Check out our picks of the best personal loans</a> to get started.</p>'
};

let wrapper: any;

describe('CardGroup', () => {
  beforeEach(() => {
    wrapper = shallowMount(CardGroup, {
      propsData: { cardGroup: cardGroupMock }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should create a CardGroup component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Render', () => {
    it('It should render the header', () => {
      const actual = wrapper.find('.CardGroup__header');
      const expected = 'Balance Transfer with a bad credit rating.';
      expect(actual.text()).toEqual(expected);
    });
  });

  describe('Methods', () => {
    describe('mapCardTypeToString', () => {
      it('It should map card type and return a string', () => {
        const actual = wrapper.vm.mapCardTypeToString('balance_transfer');
        const expected = 'Balance Transfer';
        expect(actual).toEqual(expected);

        const actual1 = wrapper.vm.mapCardTypeToString('low_interest');
        const expected1 = 'Low Interest';
        expect(actual1).toEqual(expected1);
      });

      it('It should return the default value if passed a string that doesnt match', () => {
        const actual = wrapper.vm.mapCardTypeToString('not_found');
        const expected = 'not_found';
        expect(actual).toEqual(expected);
      });
    });

    describe('mapCreditRatingToString', () => {
      it('It should map card type and return a string', () => {
        const actual = wrapper.vm.mapCreditRatingToString('goodexcellent');
        const expected = 'Good to Excellent';
        expect(actual).toEqual(expected);

        const actual1 = wrapper.vm.mapCreditRatingToString('fair');
        const expected1 = 'Fair';
        expect(actual1).toEqual(expected1);
      });

      it('It should return the default value if passed a string that doesnt match', () => {
        const actual = wrapper.vm.mapCreditRatingToString('notfound');
        const expected = 'notfound';
        expect(actual).toEqual(expected);
      });
    });
  });
});

// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import CardList from '@/components/CardList.vue';

// Scaffolding
const cardTypeFilters = [
  {
    label: 'Balance Transfer',
    name: 'balance_transfer',
    checked: false,
    icon: 'exchange-alt'
  },
  {
    label: 'Low Interest',
    name: 'low_interest',
    checked: false,
    icon: 'tag'
  },
  {
    label: 'Travel',
    name: 'travel',
    checked: false,
    icon: 'plane-departure'
  },
  {
    label: 'Cash Back',
    name: 'cash_back',
    checked: false,
    icon: 'hand-holding-usd'
  }
];

let wrapper: any;

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
    it('should render the header copy', () => {
      // console.log(wrapper);
      const actual = wrapper.find('h2');
      const expected = 'What can we help you find in a credit card?';
      expect(actual.text()).toEqual(expected);
    });
  });

  describe('Methods', () => {
    // Don't need to test sortCards method as it's just returning third party data
    it('getAppliedFiltersString should return an array of strings of applied filters', () => {
      cardTypeFilters[1].checked = true;
      const expected = ['low_interest'];
      const actual = wrapper.vm.getAppliedFiltersString(cardTypeFilters);

      expect(actual).toEqual(expected);
    });
  });
});

// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import CardList from '@/components/CardList.vue';

// Scaffolding
const cardTypeFiltersMock = [
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
      const actual = wrapper.find('h2');
      const expected = 'I want to maximize...';
      expect(actual.text()).toEqual(expected);
    });
  });

  describe('Methods', () => {
    describe('vue lifecycle methods', () => {
      /* it('should register getCardData on mount', () => {});
      it('should listen to the EventBus on mount', () => {});
      it('should list to the scroll event on mount', () => {}); */
    });

    // Don't need to test sortCards method as it's just returning third party data
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
      it('should accept a name and apply the checkmark', () => {});
    });
  });
});

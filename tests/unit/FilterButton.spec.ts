// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import FilterButton from '@/components/common/FilterButton.vue';

// Event Bus
import { EventBus } from '@/lib';

// Scaffold
const FilterButtonMock = {
  checked: true,
  name: 'balance_transfer'
};

let wrapper: any;

describe('FilterButton', () => {
  beforeEach(() => {
    wrapper = shallowMount(FilterButton, {
      propsData: {
        checked: FilterButtonMock.checked,
        name: FilterButtonMock.name
      }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should create a FilterButton component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Render', () => {
    it('should render', () => {
      const actual = wrapper.find('.FilterButton');
      expect(actual).toBeDefined();
    });

    it('should add --checked class if checked === true', () => {
      const actual = wrapper.find('.FilterButton');
      const expected = ['FilterButton', 'FilterButton--checked'];
      expect(actual.classes()).toEqual(expected);
    });
  });

  describe('Methods', () => {
    it('should emit apply-filter event on click', () => {
      const spy = jest.spyOn(EventBus, '$emit');

      wrapper.vm.emitGlobalClickEvent();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('apply-filter', 'balance_transfer');
    });
  });
});

describe('FilterButton - Checked False: Render', () => {
  beforeEach(() => {
    wrapper = shallowMount(FilterButton, {
      propsData: {
        checked: false,
        name: FilterButtonMock.name
      }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should not have --checked class if checked === false', () => {
    const actual = wrapper.find('.FilterButton');
    const expected = ['FilterButton'];
    expect(actual.classes()).toEqual(expected);
  });
});

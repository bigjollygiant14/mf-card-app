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
  name: 'balance_transfer',
  type: 'card_type'
};

let wrapper: any;

describe('FilterButton', () => {
  beforeEach(() => {
    wrapper = shallowMount(FilterButton, {
      propsData: {
        checked: FilterButtonMock.checked,
        name: FilterButtonMock.name,
        type: 'card_type'
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
      const expected = [
        'FilterButton',
        'FilterButton--primary',
        'FilterButton--checked'
      ];
      expect(actual.classes()).toEqual(expected);
    });

    it('should add --primary class if buttonType isnt defined', () => {
      const actual = wrapper.find('.FilterButton');
      const expected = [
        'FilterButton',
        'FilterButton--primary',
        'FilterButton--checked'
      ];
      expect(actual.classes()).toEqual(expected);
    });
  });

  describe('Render ButtonType', () => {
    beforeEach(() => {
      wrapper = shallowMount(FilterButton, {
        propsData: {
          checked: FilterButtonMock.checked,
          name: FilterButtonMock.name,
          type: 'card_type',
          buttonType: 'primary'
        }
      });
    });

    afterEach(() => {
      wrapper.vm.$destroy;
    });

    it('should add --primary class if buttonType === primary', () => {
      const actual = wrapper.find('.FilterButton');
      const expected = [
        'FilterButton',
        'FilterButton--primary',
        'FilterButton--checked'
      ];
      expect(actual.classes()).toEqual(expected);
    });
  });

  describe('Render ButtonType', () => {
    beforeEach(() => {
      wrapper = shallowMount(FilterButton, {
        propsData: {
          checked: FilterButtonMock.checked,
          name: FilterButtonMock.name,
          type: 'card_type',
          buttonType: 'secondary'
        }
      });
    });

    afterEach(() => {
      wrapper.vm.$destroy;
    });

    it('should add --secondary class if buttonType === secondary', () => {
      const actual = wrapper.find('.FilterButton');
      const expected = [
        'FilterButton',
        'FilterButton--secondary',
        'FilterButton--checked'
      ];
      expect(actual.classes()).toEqual(expected);
    });
  });

  describe('Methods', () => {
    it('should emit apply-filter event on click', () => {
      const spy = jest.spyOn(EventBus, '$emit');

      wrapper.vm.emitGlobalClickEvent();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        'apply-filter',
        'balance_transfer',
        'card_type'
      );
    });
  });
});

describe('FilterButton - Checked False: Render', () => {
  beforeEach(() => {
    wrapper = shallowMount(FilterButton, {
      propsData: {
        checked: false,
        name: FilterButtonMock.name,
        type: FilterButtonMock.type
      }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should not have --checked class if checked === false', () => {
    const actual = wrapper.find('.FilterButton');
    const expected = ['FilterButton', 'FilterButton--primary'];
    expect(actual.classes()).toEqual(expected);
  });
});

// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import Icon from '@/components/common/Icon.vue';

// Scaffold
const IconMock = {
  icon: 'star'
};

let wrapper: any;

describe('Rating', () => {
  beforeEach(() => {
    wrapper = shallowMount(Icon, {
      propsData: { icon: IconMock.icon }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should create an Icon component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Render', () => {
    it('should render the icon passed in', () => {
      const actual = wrapper.find('.Icon');
      const expected = ['Icon', 'fas', 'fa-star'];
      expect(actual.classes()).toEqual(expected);
    });
  });
});

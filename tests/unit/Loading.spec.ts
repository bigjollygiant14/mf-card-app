// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import Loading from '@/components/common/Loading.vue';

let wrapper: any;

describe('Loading', () => {
  describe('Render isLoading:false', () => {
    beforeEach(() => {
      wrapper = shallowMount(Loading, {
        propsData: { isLoading: false }
      });
    });

    afterEach(() => {
      wrapper.vm.$destroy;
    });

    it('should create a Loading component', () => {
      expect(wrapper).toBeDefined();
    });

    it('should not render the spinner when isLoading is false', () => {
      const actual = wrapper.find('.Loading');
      expect(actual).toBeUndefined;
    });
  });

  describe('Render isLoading:true', () => {
    beforeEach(() => {
      wrapper = shallowMount(Loading, {
        propsData: { isLoading: true }
      });
    });

    afterEach(() => {
      wrapper.vm.$destroy;
    });

    it('should create a Loading component', () => {
      expect(wrapper).toBeDefined();
    });

    it('should render the spinner when isLoading is true', () => {
      wrapper.vm.isLoading = true;
      const actual = wrapper.find('.Loading');
      expect(wrapper.contains('img')).toBeTruthy;
    });
  });
});

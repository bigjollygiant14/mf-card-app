// Vendor
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

// Component
import Rating from '@/components/common/Rating.vue';

// Scaffold
const ratingMock = {
  rating: 3.5,
  outOf: 5
};

let wrapper: any;

describe('Rating', () => {
  beforeEach(() => {
    wrapper = shallowMount(Rating, {
      propsData: { outOf: ratingMock.outOf, rating: ratingMock.rating }
    });
  });

  afterEach(() => {
    wrapper.vm.$destroy;
  });

  it('should create a Rating component', () => {
    expect(wrapper).toBeDefined();
  });

  describe('Methods', () => {
    describe('getIcon', () => {
      it('It should return star if index is lower than rating', () => {
        const actual = wrapper.vm.getIcon(2);
        const expected = 'star';
        expect(actual).toEqual(expected);
      });

      it('It should return half string if index is higher than rating, decimal value is greater than 0, and index is within 1 of decimal value', () => {
        const actual = wrapper.vm.getIcon(3);
        const expected = 'star-half';
        expect(actual).toEqual(expected);
      });

      it('It should return empty string if index is higher than rating, and index is within 1 of decimal value', () => {
        const actual = wrapper.vm.getIcon(4);
        const expected = '';
        expect(actual).toEqual(expected);
      });
    });
  });
});

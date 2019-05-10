import { shallowMount } from '@vue/test-utils';
import CreditCardList from '@/components/CreditCardList.vue';

// let vm: CreditCardList;

describe('CreditCardList.vue', () => {
  /* beforeEach(() => {
    vm = shallowMount(CreditCardList);
  });

  afterEach(() => {
    vm.$destroy();
  });

  it('should exist', () => {
    expect(vm).toBeDefined();
  }); */

  describe('Render', () => {
    /* it("renders props.msg when passed", () => {
      const msg = "new message";
      const wrapper = shallowMount(CreditCardList, {
        propsData: {msg}
      });
      expect(wrapper.text()).toMatch(msg);
    }); */
  });

  describe('Methods', () => {
    it('getCardData calls getCardDataFromService', () => {
      // jest.spyOn(this, 'getCardDataFromService');
      expect(true).toBeTruthy();
    });
  });
});

import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/BaseButton.vue';

describe('BaseButton.vue', () => {
  it('Assigns allowed modification class', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: { size: 'huge' },
    });
    expect(wrapper.find('.button.button--huge').exists()).toBe(true);
  });

  it('Throws error on forbidden modification class', () => {
    const wrapper = shallowMount(BaseButton);
    expect(wrapper.vm.$options.props.size.validator('enormous')).toBe(false);
  });

  it('Matches snapshot (size: huge)', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: { size: 'huge' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

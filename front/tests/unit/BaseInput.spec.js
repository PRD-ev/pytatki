import { shallowMount } from '@vue/test-utils';
import BaseInput from '@/components/BaseInput.vue';

describe('BaseInput.vue', () => {
  it('Assigns allowed modification class', () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: { size: 'small' },
    });
    expect(wrapper.find('.base-input.base-input--small').exists()).toBe(true);
  });

  it('Throws error on forbidden modification class', () => {
    const wrapper = shallowMount(BaseInput);
    expect(wrapper.vm.$options.props.size.validator('piccolo')).toBe(false);
  });

  it('Matches snapshot (size: small)', () => {
    const wrapper = shallowMount(BaseInput, {
      propsData: { size: 'small' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

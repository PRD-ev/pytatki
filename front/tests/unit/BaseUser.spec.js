import { shallowMount } from '@vue/test-utils';
import BaseUser from '@/components/BaseUser.vue';

describe('BaseUser.vue', () => {
  it('Assigns allowed modification class', () => {
    const wrapper = shallowMount(BaseUser, {
      propsData: { size: 'small' },
    });
    expect(wrapper.find('.base-user.base-user--small').exists()).toBe(true);
  });

  it('Throws error on forbidden modification class', () => {
    const wrapper = shallowMount(BaseUser);
    expect(wrapper.vm.$options.props.size.validator('piccolo')).toBe(false);
  });

  it('Matches snapshot (size: small)', () => {
    const wrapper = shallowMount(BaseUser, {
      propsData: { size: 'small' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

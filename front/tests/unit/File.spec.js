import { shallowMount } from '@vue/test-utils';
import File from '@/components/File.vue';

describe('File.vue', () => {
  it('Displays external note image correctly', () => {
    const wrapper = shallowMount(File, {
      propsData: { type: 'external' },
    });
    expect(wrapper.find('img').attributes().alt).toBe('notatka zewnętrzna');
  });

  it('Displays pytatki note image correctly', () => {
    const wrapper = shallowMount(File, {
      propsData: { type: 'pytatki' },
    });
    expect(wrapper.find('img').attributes().alt).toBe('notatka');
  });

  it('Displays download note image correctly', () => {
    const wrapper = shallowMount(File, {
      propsData: { type: 'download' },
    });
    expect(wrapper.find('img').attributes().alt).toBe('pobierz');
  });

  it('Throws error on forbidden type class', () => {
    const wrapper = shallowMount(File, {
      propsData: { type: 'download' },
    });
    expect(wrapper.vm.$options.props.type.validator('note')).toBe(false);
  });

  it('Matches snapshot (type: external)', () => {
    const wrapper = shallowMount(File, {
      propsData: { type: 'external' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

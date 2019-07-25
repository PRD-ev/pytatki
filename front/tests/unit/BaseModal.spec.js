import { shallowMount } from '@vue/test-utils';
import BaseModal from '@/components/BaseModal.vue';

describe('BaseModal.vue', () => {
  it('Opens correctly', () => {
    const wrapper = shallowMount(BaseModal, {
      slots: {
        trigger: '<p class="open"></p>',
        'modal-content': "<p>Hi, I'm the content</p>",
      },
    });
    wrapper.find('.open').trigger('click');
    expect(wrapper.vm.modalOn).toBe(true);
  });

  it('Closes correctly', () => {
    const wrapper = shallowMount(BaseModal, {
      slots: {
        trigger: '<p class="open"></p>',
        'modal-content': "<p>Hi, I'm the content</p>",
      },
    });
    wrapper.setData({ modalOn: true });
    wrapper.find('.close-modal').trigger('click');
    expect(wrapper.vm.modalOn).toBe(false);
  });

  it('Displays content when opened', () => {
    const wrapper = shallowMount(BaseModal, {
      slots: {
        trigger: '<p class="open"></p>',
        'modal-content': '<p class="content"></p>',
      },
    });
    wrapper.setData({ modalOn: true });
    expect(wrapper.find('.content').exists()).toBe(true);
  });

  it('Hides content when closed', () => {
    const wrapper = shallowMount(BaseModal, {
      slots: {
        trigger: '<p class="open"></p>',
        'modal-content': '<p class="content"></p>',
      },
    });
    expect(wrapper.find('.content').exists()).toBe(false);
  });

  it('Matches snapshot', () => {
    const wrapper = shallowMount(BaseModal, {
      slots: {
        trigger: '<p class="open"></p>',
        'modal-content': '<p class="content"></p>',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

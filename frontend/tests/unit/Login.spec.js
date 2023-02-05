// Login.spec.js
import Login from '@/views/LoginView.vue'
import { shallowMount } from '@vue/test-utils'

describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Login)
  })

  it('renders the component', () => {
    expect(wrapper.html()).toContain('<div class="login">')
  })
})

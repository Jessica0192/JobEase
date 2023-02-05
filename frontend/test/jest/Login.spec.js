// Login.spec.js
import Login from '@/components/Login.vue'
import { shallowMount } from '@vue/test-utils'

describe('Login', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Login)
  })

  it('renders the login form', () => {
    expect(wrapper.find('.login-page').exists()).toBe(true)
  })

  it('displays an error message if user name or password is empty', async () => {
    wrapper.setData({ userNameLogin: '', passwordLogin: '' })
    await wrapper.vm.doLogin()
    expect(wrapper.vm.emptyFields).toBe(true)
  })

  it('displays a success message if user name and password are entered', async () => {
    wrapper.setData({ userNameLogin: 'test', passwordLogin: 'test' })
    await wrapper.vm.doLogin()
    expect(wrapper.vm.emptyFields).toBe(false)
  })
})

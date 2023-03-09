// Import the Login class from Login.js
import Login from '@/views/LoginView.vue'
import {mount} from '@vue/test-utils'

describe('Login', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Login)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('successfully login', () => {
    wrapper.setData({
      userNameLogin: 'Jessica012125',
      passwordLogin: '11111111'
    })

    // Call the doLogin method
    wrapper.vm.doLogin()

    // Add your test expectations here
    expect(wrapper.vm.msg.failedMsg).toBe(undefined);
  })

  it('cant process because of empty field', () => {
    wrapper.setData({
      userNameLogin: '',
      passwordLogin: '11111111'
    })

    // Call the doLogin method
    wrapper.vm.doLogin()

    // Add your test expectations here
    expect(wrapper.vm.emptyFields).toBe(true);
  })

  it('Incorrect username or password', () => {
    wrapper.setData({
      userNameLogin: 'Jessica012125',
      passwordLogin: 'wrongPassword'
    })

    // Call the doLogin method
    wrapper.vm.doLogin()

    // Add your test expectations here
    expect(wrapper.vm.msg.failedMsg).not.toBeNull();
  })
})

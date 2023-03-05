import Register from '../../src/views/RegisterView.vue'
import { mount } from '@vue/test-utils'

jest.mock('../../src/services/UserApi.js', () => ({
  createUser: jest.fn().mockResolvedValue({ status: 200 })
}))

describe('Register', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Register)
    wrapper.setData({
      firstNameReg: 'John',
      lastNameReg: 'Doe',
      emailReg: 'john.doe@example.com',
      userNameReg: 'johndoe',
      passwordReg: 'secret',
      confirmReg: 'secret'
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should show an error message when all fields are empty', async () => {
    wrapper.setData({
      firstNameReg: '',
      lastNameReg: '',
      emailReg: '',
      userNameReg: '',
      passwordReg: '',
      confirmReg: ''
    })

    await wrapper.vm.doRegister()
    expect(wrapper.vm.emptyFields).toBe(true)
  })

  it('should show an error message when any of the input is not in the correct format', async () => {
    wrapper.setData({
      disabled: [true, false, false, false, false]
    })

    global.alert = jest.fn()
    await wrapper.vm.doRegister()
    expect(global.alert).toHaveBeenCalledWith('Please provide inputs in correct format')
  })

  it('emptyFields property should be false when all fields are filled out and clicked Register button', async () => {
    wrapper.find('#register-button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.emptyFields).toBe(false);
  })
})

import CreateJobRecord from '@/views/jobRecord/CreateJobRecordView.vue'
import { mount } from '@vue/test-utils'
import Login from '@/modules/login'

jest.mock('../../src/services/JobRecordApi.js', () => ({
  createUser: jest.fn().mockResolvedValue({ status: 200 })
}))

describe('CreateJobRecord', () => {
  let wrapper

  beforeAll(async () => {
   // create an instance of the Login class
    const loginInstance = new Login()

    // set the desired properties
    loginInstance.userNameLogin = 'Jessica012125';
    loginInstance.passwordLogin = '11111111';

    // call the doLogin method to log in and get the credentials
    await loginInstance.doLogin()

    wrapper = mount(CreateJobRecord)
    wrapper.setData({
      job_title: "string",
      status: {
        "id": 0,
        "status_name": "Interested"
      },
      notes: "string",
      deadline_date: "2023-03-05T19:46:34.234Z",
      interview_date: "2023-03-05T19:46:34.234Z",
      organization_name: "string",
      salary: 0,
      job_url: "string",
      location: "string",
      tags: [],
      portfolio: {}
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should display error message when job title is empty', async () => {
    wrapper.vm.$refs.jobInfoTab.$data.job.title = ''; // set job title to empty string
    await wrapper.vm.createJobRecord(); // call createJobRecord method

    expect(wrapper.vm.jobMsg.failed).toBe('Please fill out all required fields');
  });

})

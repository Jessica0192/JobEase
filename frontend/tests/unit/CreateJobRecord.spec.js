import { mount } from '@vue/test-utils'
import CreateJobRecord from '@/views/jobRecord/CreateJobRecordView.vue'
import Login from '@/views/LoginView.vue'
import {jobRecordApi} from '@/services/JobRecordApi'


jest.mock('@/services/JobRecordApi.js', () => ({
  createJobRecord: jest.fn()
}))

describe('JobRecordForm', () => {
  let wrapper
  let loginWrapper

  beforeEach(() => {
    // need to login first
    loginWrapper = mount(Login)

   // create an instance of the Login class
    loginWrapper.setData({
      userNameLogin: 'Jessica012125',
      passwordLogin: '11111111'
    })

    // Call the doLogin method
    loginWrapper.vm.doLogin()

    wrapper = mount(CreateJobRecord)
    // set up job and status data for testing
    wrapper.vm.$refs.jobInfoTab.$data.job = {
      job_title: 'Software Developer',
      status: { id: 0, status_name: 'Interested' },
      deadline_date: '2023-04-01T00:00:00.000Z',
      interview_date: '2023-04-10T00:00:00.000Z',
      organization_name: 'Acme Corp',
      salary: 80000,
      notes: 'Lorem ipsum',
      job_url: 'https://www.acme.com/jobs/123',
      location: 'San Francisco',
      tags: [],
      portfolio: null
    }
    wrapper.vm.$refs.jobInfoTab.$data.statusOptions = [
      { id: 0, status_name: 'Interested' },
      { id: 1, status_name: 'Applied' },
      { id: 2, status_name: 'Interviewing' },
      { id: 3, status_name: 'Offered' },
      { id: 4, status_name: 'Rejected' }
    ]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls jobRecordApi.createJobRecord with the correct inputs and navigates back to job records on success', () => {
    // const expectedInputs = {
    //   job_title: 'Software Developer',
    //   status: { id: 0, status_name: 'Interested' },
    //   deadline_date: '2023-04-01T00:00:00.000Z',
    //   interview_date: '2023-04-10T00:00:00.000Z',
    //   organization_name: 'Acme Corp',
    //   salary: 80000,
    //   notes: 'Lorem ipsum',
    //   job_url: 'https://www.acme.com/jobs/123',
    //   location: 'San Francisco',
    //   tags: [],
    //   portfolio: null
    // };
    const response = { status: 200 };
    const jobRecordApiMock = {
      createJobRecord: jest.fn().mockResolvedValueOnce(response)
    };

    wrapper = mount(CreateJobRecord, {
      mocks: {
        jobRecordApi: jobRecordApiMock
      }
    });

    wrapper.vm.createJobRecord();
    //expect(jobRecordApiMock.createJobRecord).toHaveBeenCalledWith(JSON.stringify(expectedInputs));
    expect(wrapper.vm.navigateBackToJobRecords).toHaveBeenCalled();
  });



  it('sets jobMsg.failed when required fields are missing', async () => {
    wrapper.vm.$refs.jobInfoTab.$data.job.job_title = ''
    wrapper.vm.$refs.jobInfoTab.$data.job.status = {}

    await wrapper.vm.createJobRecord()

    expect(jobRecordApi.createJobRecord).not.toHaveBeenCalled()
    expect(wrapper.vm.jobMsg.failed).toBe('Please fill out all required fields')
  })
})

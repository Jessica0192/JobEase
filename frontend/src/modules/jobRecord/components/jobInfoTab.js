import {jobStatusApi} from '@/services/JobStatusApi'

export default {
  name: 'JobInfoTab',
  data() {
    return{
      job: {
        job_title: "",
        status: {},
        notes: "",
        deadline_date: "",
        interview_date: "",
        organization_name: "",
        salary: 0,
        job_url: "",
        location: "",
        tags: [
          {}
        ],
        portfolio: {}
      },
      statusOptions: [],  // status data with status_name and id
    }
  },
  props: {
    detailViewJobProp: {
      type: Object,
      required: false,
      default: () => ({
        job_title: "",
        status: {},
        notes: "",
        deadline_date: "",
        interview_date: "",
        organization_name: "",
        salary: 0,
        job_url: "",
        location: "",
        tags: [
          {}
        ],
        portfolio: {}
      })
    }
  },
  watch: {
    detailViewJobProp: {
      handler(newVal) {
        // Use the data from the parent component
        this.job = newVal
      },
      immediate: true
    }
  },
  mounted () {
    jobStatusApi.getAllStatus().then(response => {
      if (response && response.status === 200 && Array.isArray(response.data)) {
        this.statusOptions = response.data
      }
    });
  }
}

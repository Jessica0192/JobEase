import {jobRecordApi} from '@/services/JobRecordApi'
import router from '@/router'
import sharedMixin from '../../modules/jobRecord/shared';

export default {
  mixins: [sharedMixin],
  data() {
    return {
      jobTitle: '',
      jobStatus: '',
      deadlineDate: '',
      interviewDate: '',
      organization: '',
      salary: '',
      jobUrl: '',
      location: '',
      note: ''
    };
  },
  methods: {
    // create job record by calling api end point and navigate to Job Record page
    async createJobRecord () {
      if(this.jobTitle !== '' && this.jobStatus !== '')    //include tag later in if statement
      {
        let deadlineDateTime = (this.deadlineDate !== "") ? new Date(this.deadlineDate) : null;
        let interviewDateTime = (this.interviewDate !== "") ? new Date(this.interviewDate) : null;
        const inputs = {
            job_title: this.jobTitle,
            status: this.statusOptions.find(s=> s.status_name === this.jobStatus),
            deadline_date: (deadlineDateTime!==null)?deadlineDateTime.toISOString():new Date().toISOString(),
            interview_date: (interviewDateTime!==null)?interviewDateTime.toISOString():new Date().toISOString(),
            organization_name: this.organization,
            salary: +(this.salary),
            notes: this.note,
            job_url: this.jobUrl,
            location: this.location,
            tags: this.tags.filter(tag => this.selectedTags.map(tag => tag.id).includes(tag.id))
          }

        // call api endpoint to create new job record
        jobRecordApi.createJobRecord(JSON.stringify(inputs)).then(response => {
          if(response && response.status === 200) {
            router.push({ name: 'JobRecords'})
          }
        });

      } else {
        alert("Please fill out all required fields")
      }
    }
  },
};

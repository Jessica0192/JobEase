import {api} from '@/services/JobRecordApi'
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
      if(this.jobTitle !== '')    //include tag later in if statement
      {
        // save Job Record by api call and navigate to Job Record page
        let deadlineDateTime = (this.deadlineDate !== "") ? new Date(this.deadlineDate) : null;
        let interviewDateTime = (this.interviewDate !== "") ? new Date(this.interviewDate) : null;
        const inputs = {
            job_title: this.jobTitle,
            deadline_date: (deadlineDateTime!==null)?deadlineDateTime.toISOString():new Date().toISOString(),
            interview_date: (interviewDateTime!==null)?interviewDateTime.toISOString():new Date().toISOString(),
            organization_name: this.organization,
            salary: +(this.salary),
            notes: this.note,
            job_url: this.jobUrl,
            location: this.location,
            tags: Array.from(this.selectedTags, tag => parseInt(tag.id))
          }

        // call api endpoint to create new job record
        api.createJobRecord(JSON.stringify(inputs)).then(response => {
          if(response.status===200) {
            router.push({ name: 'JobRecords'})
          }
        });


      } else {
        alert("Please fill out all required fields")
      }
    }
  },
};

import {jobRecordApi} from '@/services/JobRecordApi'
import router from '@/router'
import sharedMixin from '../../modules/jobRecord/shared';

export default {
  mixins: [sharedMixin],
  name: 'JobRecordDetailView',
  data() {
    return {
      id: null,
      job: null
    };
  },
  mounted() {
    // call fetchJob method to get data by calling api endpoint and update UI
    this.fetchJob();
  },
  methods: {
    // call getJobRecordById endpoint and fill out fields in UI
    async fetchJob() {
      this.id = this.$route.params.id;

      // this is api call getting job record data by passing job record id
      try {
        await jobRecordApi.getJobRecordByID(this.id).then(response => {
           this.job = response.data;
        });

        let tempSelectedTags = this.job.tags
         for (let i = 0; i < tempSelectedTags.length; i++) {
            let tempId = tempSelectedTags[i].id;
            for (let j = 0; j < this.tempTags.length; j++) {
              console.log(`this.tags: ${this.tags[j]}`)
              if (tempId === this.tempTags[j].id) {
                let foundTag = this.tempTags.splice(j, 1)[0];
                this.selectedTags.push(foundTag);
                break;
              }
            }
          }
      } catch (error) {
          console.log(error)
          alert(error)
      }
    },
    async saveJobRecord () {
      if(this.job.job_title !== '' && this.job.status !== '')   //include tag later in if statement
      {
        // save Job Record by api call and navigate to Job Record page
        let deadlineDateTime = new Date(this.job.deadline_date);
        let interviewDateTime = new Date(this.job.interview_date);

        const inputs = {
            job_title: this.job.job_title,
            status: this.statusOptions.find(s=> s.status_name === this.job.status.status_name),
            deadline_date: deadlineDateTime.toISOString(),
            interview_date: interviewDateTime.toISOString(),
            organization_name: this.job.organization_name,
            salary: +(this.job.salary),
            notes: this.job.notes,
            job_url: this.job.job_url,
            location: this.job.location,
            tags: this.tags.filter(tag => this.selectedTags.map(tag => tag.id).includes(tag.id))
          }

          console.log(inputs)
        // update Job Record
        jobRecordApi.updateJobRecord(this.id, JSON.stringify(inputs)).then(response => {
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

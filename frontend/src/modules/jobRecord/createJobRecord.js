import {jobRecordApi} from '@/services/JobRecordApi'
import router from '@/router'
import sharedMixin from '../../modules/jobRecord/shared';
import PortfolioTab from '@/components/jobRecord/PortfolioTab.vue'
import TagTab from '@/components/jobRecord/TagTab.vue'
import JobInfoTab from '@/components/jobRecord/JobInfoTab.vue'


export default {
  mixins: [sharedMixin],
  components: {
    JobInfoTab: JobInfoTab,
    PortfolioTab,
    TagTab
  },
  methods: {
    // create job record by calling api end point and navigate to Job Record page
    async createJobRecord () {
      if (this.$refs.jobInfoTab.$data.job !== null) {
        let jobTemp = this.$refs.jobInfoTab.$data.job

        if (jobTemp.job_title !== '' && JSON.stringify(jobTemp.status) !== JSON.stringify({}))
        {
          let deadlineDateTime = (jobTemp.deadline_date !== "") ? new Date(jobTemp.deadline_date).toISOString() : null;
          let interviewDateTime = (jobTemp.interview_date !== "") ? new Date(jobTemp.interview_date).toISOString() : null;

          const inputs = {
            job_title: jobTemp.job_title,
            status: this.$refs.jobInfoTab.$data.statusOptions.find(s => s.status_name === jobTemp.status.status_name),
            deadline_date: deadlineDateTime,
            interview_date: interviewDateTime,
            organization_name: jobTemp.organization_name,
            salary: +(jobTemp.salary),
            notes: jobTemp.notes,
            job_url: jobTemp.job_url,
            location: jobTemp.location,
            tags: this.$refs.tagTab.$data.tags.filter(tag => this.$refs.tagTab.$data.selectedTags.map(tag => tag.id).includes(tag.id)),
            portfolio: null
          }

          console.log(inputs)

          // call api endpoint to create new job record
          jobRecordApi.createJobRecord(JSON.stringify(inputs)).then(response => {
            if (response && response.status === 200) {
              router.push({name: 'JobRecords'})
            }
          });

        } else {
          alert("Please fill out all required fields")
        }
      }
    }
  }
};

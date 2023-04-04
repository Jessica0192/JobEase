import {jobRecordApi} from '@/services/JobRecordApi'
import sharedMixin from '../../modules/jobRecord/shared';
import PortfolioTab from '@/components/jobRecord/PortfolioTab.vue'
import TagTab from '@/components/jobRecord/TagTab.vue'
import JobInfoTab from '@/components/jobRecord/JobInfoTab.vue'
import NotesTab from '@/components/jobRecord/NotesTab.vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


export default {
  mixins: [sharedMixin],
  components: {
    FontAwesomeIcon,
    JobInfoTab: JobInfoTab,
    PortfolioTab,
    TagTab,
    NotesTab
  },
  methods: {
    // create job record by calling api end point and navigate to Job Record page
    async createJobRecord () {
      let deadlineDateTime = null;
      let interviewDateTime = null;

      if (this.$refs.jobInfoTab.$data.job !== null) {
        let jobTemp = this.$refs.jobInfoTab.$data.job

        if (jobTemp.job_title !== '' && JSON.stringify(jobTemp.status) !== JSON.stringify({}))
        {
          if (jobTemp.deadline_date !== "") {
            const deadlineDate = new Date(jobTemp.deadline_date);
            const offsetMinutes = deadlineDate.getTimezoneOffset();
            deadlineDate.setMinutes(deadlineDate.getMinutes() - offsetMinutes);
            deadlineDateTime = deadlineDate.toISOString();
          }
          if (jobTemp.interview_date !== "") {
            const interviewDate = new Date(jobTemp.interview_date);
            const offsetMinutes = interviewDate.getTimezoneOffset();
            interviewDate.setMinutes(interviewDate.getMinutes() - offsetMinutes);
            interviewDateTime = interviewDate.toISOString();
          }

          console.log(jobTemp.deadline_date)
          console.log(jobTemp.interview_date)

          const inputs = {
            job_title: jobTemp.job_title,
            status: this.$refs.jobInfoTab.$data.statusOptions.find(s => s.status_name === jobTemp.status.status_name),
            deadline_date: deadlineDateTime,
            interview_date: interviewDateTime,
            organization_name: jobTemp.organization_name,
            salary: +(jobTemp.salary),
            description: jobTemp.description,
            job_url: jobTemp.job_url,
            location: jobTemp.location,
            job_notes: this.$refs.notesTab.$data.notes,
            tags: this.$refs.tagTab.$data.tags.filter(tag => this.$refs.tagTab.$data.selectedTags.map(tag => tag.id).includes(tag.id)),
            portfolio: this.$refs.portfolioTab.$data.selectedPortfolio ? this.$refs.portfolioTab.$data.selectedPortfolio : null
          }
          console.log(inputs)

          // call api endpoint to create new job record
          await jobRecordApi.createJobRecord(JSON.stringify(inputs)).then(response => {
            if (response && response.status === 200) {
              this.navigateBackToJobRecords()
            }
            else {
              this.$refs.alert.showAlert('error',
              response.data.detail,
              'Error')
            }
          });

        } else {
          this.jobMsg.failed = 'Please fill out all required fields'
        }
      }
    }
  }
};

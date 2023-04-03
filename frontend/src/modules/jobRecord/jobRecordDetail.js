import {jobRecordApi} from '@/services/JobRecordApi'
import sharedMixin from '../../modules/jobRecord/shared';
import PortfolioTab from '@/components/jobRecord/PortfolioTab.vue'
import TagTab from '@/components/jobRecord/TagTab.vue'
import JobInfoTab from '@/components/jobRecord/JobInfoTab.vue'
import NotesTab from '@/components/jobRecord/NotesTab.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  mixins: [sharedMixin],
  name: 'JobRecordDetailView',
  components: {
    FontAwesomeIcon,
    JobInfoTab:JobInfoTab,
    PortfolioTab,
    TagTab,
    NotesTab,
    ConfirmationDialog
  },
  data() {
    return {
      id: null,
      tempJob: null,
      openDeleteConfirmDialog: false,
    };
  },
  mounted() {
    // api call to get data by calling api endpoint and update UI
    this.fetchData();
  },
  methods: {
    async fetchData(){
      this.id = this.$route.params.id;

      // this is api call getting job record data by passing job record id
      try {
        await jobRecordApi.getJobRecordByID(this.id).then(response => {
          if(response && response.status===200) {
            this.tempJob = response.data;

            const h1 = document.getElementById('jobTitleOnHeading');
            h1.textContent = this.tempJob.job_title;

            // update selected tags
            let tempSelectedTags = this.tempJob.tags
            for (let i = 0; i < tempSelectedTags.length; i++) {
              let tempId = tempSelectedTags[i].id;
              for (let j = 0; j < this.$refs.tagTab.$data.tempTags.length; j++) {
                if (tempId === this.$refs.tagTab.$data.tempTags[j].id) {
                  let foundTag = this.$refs.tagTab.$data.tempTags.splice(j, 1)[0];
                  this.$refs.tagTab.$data.selectedTags.push(foundTag);
                  break;
                }
              }
            }

            // update job notes
            if(this.tempJob.job_notes) {
              this.$refs.notesTab.$data.notes = this.tempJob.job_notes
            }

            // update selected portfolio
            if(this.tempJob.portfolio) {
              this.$refs.portfolioTab.$data.selectedPortfolio = this.tempJob.portfolio
            }
          }
        });
      } catch (error) {
          console.log(error)
      }
    },
    async deleteJobRecord () {
      await jobRecordApi.deleteJobRecord(this.id).then(response => {
        if (response && response.status === 200) {
          this.navigateBackToJobRecords()
        }
      })
     },
    async saveJobRecord () {
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

          // update Job Record
          await jobRecordApi.updateJobRecord(this.id, JSON.stringify(inputs)).then(response => {
            if (response && response.status === 200) {
              this.navigateBackToJobRecords()
            }
            else {
              alert(response.data.detail)
            }
          });

        } else {
          this.jobMsg.failed = 'Please fill out all required fields'
        }
      }
    }
  },
};

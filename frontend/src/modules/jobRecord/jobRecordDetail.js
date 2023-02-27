import {jobRecordApi} from '@/services/JobRecordApi'
import router from '@/router'
import sharedMixin from '../../modules/jobRecord/shared';
import PortfolioTab from '@/components/jobRecord/PortfolioTab.vue'
import TagTab from '@/components/jobRecord/TagTab.vue'
import JobInfoTab from '@/components/jobRecord/JobInfoTab.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

export default {
  mixins: [sharedMixin],
  name: 'JobRecordDetailView',
  components: {
    JobInfoTab:JobInfoTab,
    PortfolioTab,
    TagTab,
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
    fetchData(){
      this.id = this.$route.params.id;

      // this is api call getting job record data by passing job record id
      try {
        jobRecordApi.getJobRecordByID(this.id).then(response => {
          if(response && response.status===200) {
            this.tempJob = response.data;

            let tempSelectedTags = this.tempJob.tags
            console.log(tempSelectedTags)
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
          }
        });
      } catch (error) {
          console.log(error)
      }
    },
    deleteJobRecord () {
      if(confirm("Do you really want to delete?")) {
        jobRecordApi.deleteJobRecord(this.id).then(response => {
          if (response && response.status === 200) {
            alert("Successfully deleted Job Record")
            router.push({name: 'JobRecords'})
          }
        })
      }
     },
    async saveJobRecord () {
      if (this.$refs.jobInfoTab.$data.job !== null) {
        let jobTemp = this.$refs.jobInfoTab.$data.job
        if (jobTemp.job_title !== '' && jobTemp.status !== '')   //include tag later in if statement
        {
          // save Job Record by api call and navigate to Job Record page
          let deadlineDateTime = new Date(jobTemp.deadline_date);
          let interviewDateTime = new Date(jobTemp.interview_date);

          const inputs = {
            job_title: jobTemp.job_title,
            status: this.$refs.jobInfoTab.$data.statusOptions.find(s => s.status_name === jobTemp.status.status_name),
            deadline_date: deadlineDateTime.toISOString(),
            interview_date: interviewDateTime.toISOString(),
            organization_name: jobTemp.organization_name,
            salary: +(jobTemp.salary),
            notes: jobTemp.notes,
            job_url: jobTemp.job_url,
            location: jobTemp.location,
            tags: this.$refs.tagTab.$data.tags.filter(tag => this.$refs.tagTab.$data.selectedTags.map(tag => tag.id).includes(tag.id)),
            portfolio: null
          }

          console.log(inputs)

          // update Job Record
          jobRecordApi.updateJobRecord(this.id, JSON.stringify(inputs)).then(response => {
            if (response && response.status === 200) {
              router.push({name: 'JobRecords'})
            }
          });

        } else {
          alert("Please fill out all required fields")
        }
      }
    }
  },
};

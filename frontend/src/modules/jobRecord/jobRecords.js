import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink, MDBIcon  } from "mdb-vue-ui-kit";
import {jobRecordApi} from '@/services/JobRecordApi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '@/router'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import {downloadPortfolio} from '@/modules/portfolio/portfolios'

library.add(faPlus)

export default {
  components: {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBIcon,
    FontAwesomeIcon,
    ConfirmationDialog
  },
  data() {
    return {
      searchText: '',
      jobs: [],
      jobRecordIdToDelete: null,
      openDeleteConfirmDialog: false,
    };
  },
  computed: {
    filteredJobs() {
      if (!this.searchText) {
        return this.jobs;
      }
      const searchTextLower = this.searchText.toLowerCase();
      return this.jobs.filter(job => {
        return (
          job.job_title.toLowerCase().includes(searchTextLower) ||
          job.status.status_name.toLowerCase().includes(searchTextLower) ||
          job.description.toLowerCase().includes(searchTextLower)
        );
      });
    },
  },
  created () {
   // API call to retrieve job records and store in the jobs property
   jobRecordApi.getAllJobRecords().then(response => {
      if(response && response.status === 200) {
        this.jobs = response.data;
      }
   });
 },
 methods: {
  formattedDatetime(isoDatetime) {
    const date = new Date(isoDatetime)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  },
  openDeleteJobRecordDialog(id){
    this.jobRecordIdToDelete = id
    this.openDeleteConfirmDialog = true
  },
  async deleteJobRecord () {
      await jobRecordApi.deleteJobRecord(this.jobRecordIdToDelete).then(response => {
        if(response && response.status === 200) {
          location.reload()
        }
      })
   },
   navigateToCreatePage () {
     router.push({ name: 'CreateJobRecord' })
   },
   navigateToDetailPage(id) {
    router.push({ name: 'JobRecordDetail', params: { id } });
  },
   downloadLinkPortfolioOnClick(id){
    const selectedJob = this.jobs.find(x=>x.id === id)
    if(selectedJob.portfolio) {
      downloadPortfolio(selectedJob.portfolio.resources, selectedJob.portfolio.portfolio_name)
    } else {
      alert("There's no portfolio linked to this Job Record")
    }
   }
 }
};

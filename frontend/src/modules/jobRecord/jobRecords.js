import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink, MDBIcon  } from "mdb-vue-ui-kit";
import {jobRecordApi} from '@/services/JobRecordApi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '@/router'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

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
          job.notes.toLowerCase().includes(searchTextLower)
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
  openDeleteJobRecordDialog(id){
    this.jobRecordIdToDelete = id
    this.openDeleteConfirmDialog = true
  },
  deleteJobRecord () {
      jobRecordApi.deleteJobRecord(this.jobRecordIdToDelete).then(response => {
        if(response && response.status === 200) {
          alert("Successfully deleted Job Record")
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
 }
};

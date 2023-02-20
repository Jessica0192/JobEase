import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink  } from "mdb-vue-ui-kit";
import {jobRecordApi} from '../../services/JobRecordApi'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '@/router'

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
    FontAwesomeIcon
  },
  data() {
    return {
      searchText: '',
      jobs: []
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
          job.status.toLowerCase().includes(searchTextLower) ||
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
     navigateToCreatePage () {
       router.push({ name: 'CreateJobRecord' })
     },
     navigateToDetailPage(id) {
      router.push({ name: 'JobRecordDetail', params: { id } });
    },
   }
};

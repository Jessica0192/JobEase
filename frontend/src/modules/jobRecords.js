import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink  } from "mdb-vue-ui-kit";
import {api} from '../services/JobRecordApi'
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
      jobs: []
    };
  },
  created () {
   // API call to retrieve job records and store in the jobs property
   api.getAllJobRecords().then(response => {
     this.jobs = response.data;
   });
   // this.jobs = [
   //   {
   //     "id": "0",
   //     "jobStatus": "Interested",
   //     "tags": ["Tag1", "Tag2", "Tag3"],
   //     "jobTitle": "Job 1",
   //     "notes": "This is a note",
   //     "created_at": "2023-02-08T16:12:31.333Z",
   //     "updated_at": "2023-02-08T16:12:31.333Z"
   //   },
   //   {
   //     "id": "1",
   //     "jobStatus": "Applied",
   //     "tags": ["Tag1", "Tag2", "Tag3"],
   //     "jobTitle": "Job 2",
   //     "notes": "This is a note",
   //     "created_at": "2023-02-08T16:12:31.333Z",
   //     "updated_at": "2023-02-08T16:12:31.333Z"
   //   }
   // ]
   console.log(this.jobs[0]);
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

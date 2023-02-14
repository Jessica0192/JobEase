import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink  } from "mdb-vue-ui-kit";
import {api} from '../../services/JobRecordApi'
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

<template>
  <h1>Job Records</h1>
  <div>
    <MDBRow :cols="['1', 'md-3']" class="g-4">
      <MDBCol v-for="job in jobs" :key="job.id">
        <MDBCard class="h-80">
          <MDBCardBody>
            <MDBCardTitle>{{ job.jobTitle }}</MDBCardTitle>
            <MDBCardTitle subtitle class="mb-2 text-muted">{{ job.jobStatus }}</MDBCardTitle>
            <MDBCardText>
              {{ job.notes }}
            </MDBCardText>
            <MDBCardLink href="#">Open Detail</MDBCardLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </div>
</template>
<script>
  import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink  } from "mdb-vue-ui-kit";
  // import {api} from '../services/JobRecordApi'

  export default {
    components: {
      MDBCol,
      MDBRow,
      MDBCard,
      MDBCardBody,
      MDBCardTitle,
      MDBCardText,
      MDBCardLink
    },
    data() {
      return {
        jobs: []
      };
    },
    created() {
      // API call to retrieve job records and store in the jobs property
      // api.getAllJobRecords().then(response => {
      //   this.jobs = response.data;
      // });
      this.jobs =[
            {
              "id": "0",
              "jobStatus": "Interested",
              "tags": ["Tag1", "Tag2", "Tag3"],
              "jobTitle": "Job 1",
              "notes": "This is a note",
              "created_at": "2023-02-08T16:12:31.333Z",
              "updated_at": "2023-02-08T16:12:31.333Z"
            },
            {
              "id": "1",
              "jobStatus": "Applied",
              "tags": ["Tag1", "Tag2", "Tag3"],
              "jobTitle": "Job 2",
              "notes": "This is a note",
              "created_at": "2023-02-08T16:12:31.333Z",
              "updated_at": "2023-02-08T16:12:31.333Z"
            }
          ]
      console.log(this.jobs);

    }
  };
</script>
<style scoped src="../assets/css/jobRecordsPage.css">
</style>

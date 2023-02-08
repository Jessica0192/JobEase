<template>
  <h1 class="view-title">Job Records</h1>
  <div>
    <div class="container">
        <b-button class="create-button" @click="navigateToCreatePage">
          <font-awesome-icon :icon="['fas', 'plus']"/>
        </b-button>
    </div>
    <div class="cards-container">
      <MDBRow :cols="['1', 'md-3']" class="g-4" >
        <MDBCol v-for="job in jobs" :key="job.id">
          <MDBCard class="h-80">
            <MDBCardBody>
              <MDBCardTitle>{{ job.jobTitle }}</MDBCardTitle>
              <MDBCardTitle subtitle class="mb-2 text-muted">{{ job.jobStatus }}</MDBCardTitle>
              <MDBCardText>
                {{ job.notes }}
              </MDBCardText>
              <MDBCardLink @click="navigateToDetailPage(job.id)">Open Detail</MDBCardLink>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>

  </div>
</template>

<script src="../modules/jobRecords.js">
</script>

<style scoped src="../assets/css/jobRecordsPage.css">
</style>

<template>
  <h1 class="view-title">Job Records</h1>
  <div>
   <div class="container">
      <b-button class="plus-button" @click="navigateToCreatePage" style="float:left;">
        <font-awesome-icon :icon="['fas', 'plus']"/>
      </b-button>
      <!-- Search form -->
      <form style="display:inline-block; float:right;" class="d-none d-md-flex input-group w-auto my-auto navbar-nav ms-auto d-flex flex-row" >
        <input
               autocomplete="off"
               type="search"
               class="form-control rounded"
               placeholder='Search'
               style="min-width: 225px"
               />
        <span class="input-group-text border-0"
              ><i class="fas fa-search"></i
          ></span>
      </form>
    </div>
    <div class="cards-container">
      <MDBRow :cols="['1', 'md-3']" class="g-4" >
        <MDBCol v-for="job in jobs" :key="job.id">
          <MDBCard class="h-80">
            <MDBCardBody>
              <MDBCardTitle>{{ job.job_title }}</MDBCardTitle>
              <MDBCardTitle subtitle class="mb-2 text-muted">{{ job.jobStatus }}</MDBCardTitle>
              <MDBCardText>
                {{ job.notes }}
              </MDBCardText>
              <MDBCardLink class="cursor-pointer" @click="navigateToDetailPage(job.id)">Open Detail</MDBCardLink>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>

  </div>
</template>

<script src="../../modules/jobRecords.js">
</script>

<style scoped src="../../assets/css/jobRecordsPage.css">
</style>

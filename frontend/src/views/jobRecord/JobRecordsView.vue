<template>
  <ConfirmationDialog
      style="align-content: center"
      v-if="openDeleteConfirmDialog"
      title="Confirmation"
      message="Are you sure you want to delete this record?"
      confirm-btn-label="Yes"
      :on-confirm="deleteJobRecord"
      @close-modal="openDeleteConfirmDialog = false; jobRecordIdToDelete = null"
  />
  <h1 class="view-title">Job Records</h1>
  <div>
   <div class="container">
      <button class="plus-button" @click="navigateToCreatePage" style="float:left;">
        <font-awesome-icon :icon="['fas', 'plus']"
                            title="Create job record"/>
      </button>
      <!-- Search form -->
      <div style="display:inline-block; float:right;"
            class="d-none d-md-flex input-group w-auto my-auto navbar-nav ms-auto d-flex flex-row"
            >
        <input
              v-model="searchText"
               autocomplete="off"
               type="search"
               class="form-control rounded"
               placeholder='Search'
               style="min-width: 225px"
               />
        <span class="input-group-text border-0"
              ><i class="fas fa-search"></i
          ></span>
      </div>
    </div>
    <div class="cards-container">
      <MDBRow :cols="['1', 'md-3']" class="g-4" >
        <MDBCol v-for="job in filteredJobs" :key="job.id">
          <MDBCard class="h-80">
            <div class="d-flex justify-content-end" style="padding-top: 3px; padding-right: 3px">
              <div>
                <a class="m-1" href="#!" role="button" aria-controls="exampleModal" @click="openDeleteJobRecordDialog(job.id)">
                  <MDBIcon size="lg" class="fas fa-window-close text-muted p-md-1 my-1 me-0"
                         id="deleteIcon"
                         data-mdb-toggle="tooltip"
                         data-mdb-placement="top" title="Delete"></MDBIcon>
                </a>
              </div>
            </div>
            <MDBCardBody style="padding-top: 0px">
              <MDBCardTitle>{{ job.job_title }}</MDBCardTitle>
              <MDBCardTitle subtitle class="mb-2 text-muted">{{ job.status.status_name }}</MDBCardTitle>
              <MDBCardText>
                {{ job.description }}
              </MDBCardText>
              <MDBCardLink class="cursor-pointer" @click="navigateToDetailPage(job.id)">Open Detail</MDBCardLink>
              <MDBCardLink class="cursor-pointer" @click="downloadLinkPortfolioOnClick(job.id)">Download Portfolio</MDBCardLink>
            </MDBCardBody>
            <div class="card-footer">
              <small class="text-muted">Last updated: {{ formattedDatetime(job.updated_at) }}</small>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  </div>
</template>

<script src="../../modules/jobRecord/jobRecords.js">
</script>

<style scoped src="../../assets/css/jobRecordsPage.css">
</style>

<template>
  <ConfirmationDialog
      style="align-content: center"
      v-if="openDeleteConfirmDialog"
      title="Confirmation"
      message="Are you sure you want to delete this record?"
      confirm-btn-label="Yes"
      :on-confirm="deleteJobRecord"
      @close-modal="openDeleteConfirmDialog = false"
  />
  <div style="display: flex; justify-content: space-between;">
    <div style="display: flex; justify-content: start;">
      <font-awesome-icon class="btn btn-lg" style="margin-right: 10px"
                         icon="fa-solid fa-arrow-left"
                         title="Back to Job Records page"
                         @click="navigateBackToJobRecords"/>
      <h1 class="view-title" id="jobTitleOnHeading"></h1>
    </div>
    <div class="d-flex justify-content-end">
      <a class="btn btn-lg btn-primary delete-button"
          @click="openDeleteConfirmDialog = true">Delete</a>
      <a style="margin-right: 150px"
         class="btn btn-lg btn-primary save-button"
          @click="saveJobRecord">Save</a>
    </div>
  </div>
  <div class="container">
    <br>
     <!--tabs header-->
      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('jobInfo')" :class="{ active: isActive('jobInfo') }" href="#jobInfo">Job Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('notes')" :class="{ active: isActive('notes') }" href="#notes">Notes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('tags')" :class="{ active: isActive('tags') }" href="#tags">Tags</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="setActive('portfolio')" :class="{ active: isActive('portfolio') }" href="#portfolio">Portfolio</a>
        </li>
      </ul>
      <!--tabs content-->
      <div class="tab-content py-3" id="myTabContent">
        <!--first tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('jobInfo') }" >
          <JobInfoTab :detailViewJobProp="tempJob" ref="jobInfoTab"/>
        </div>
        <!--end of first tab-->
        <!--second tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('notes') }" id="notes">
          <NotesTab ref="notesTab"/>
        </div>
        <!--end of second tab-->
        <!--third tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('tags') }" id="tags">
          <TagTab ref="tagTab"/>
        </div>
        <!--end of third tab-->
        <!--fourth tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('portfolio') }" id="portfolio">
          <PortfolioTab ref="portfolioTab"/>
        </div>
        <!--end of fourth tab-->
    </div>
  </div>
</template>

<script src="../../modules/jobRecord/jobRecordDetail.js">
</script>

<style scoped src="../../assets/css/jobRecord_create_detail.css">
</style>

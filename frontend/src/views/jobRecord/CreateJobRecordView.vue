<template>
  <div style="display: flex; justify-content: space-between;">
    <div style="display: flex; justify-content: start;">
      <font-awesome-icon class="btn btn-lg" style="margin-right: 10px"
                         icon="fa-solid fa-arrow-left"
                         title="Back to Job Records page"
                         @click="navigateBackToJobRecords"/>
      <h1 class="view-title">Create Job Record</h1>
    </div>
    <a style="margin-right: 170px" href="javascript:void(0)"
       class="btn btn-lg btn-primary create-button"
      @click="createJobRecord">Create</a>
  </div>
  <span style="color:darkred;font-size:4mm" v-if="jobMsg.failed">{{`* ${jobMsg.failed}`}}</span>
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
          <JobInfoTab ref="jobInfoTab"/>
        </div>
        <!--end of first tab-->
        <!--second tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('notes') }" id="notes">
          <NotesTab ref="notesTab"/>
        </div>
        <!--end of second tab-->
        <!--third tab-->
        <!--badge: https://getbootstrap.com/docs/4.0/components/badge/-->
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

<script src="../../modules/jobRecord/createJobRecord.js">
</script>

<style scoped  src="../../assets/css/jobRecord_create_detail.css">
</style>

<template>
  <div style="display: flex; justify-content: space-between;">
    <h1 class="view-title">Job Record Detail</h1>
    <div class="d-flex justify-content-end">
      <a class="btn btn-lg btn-primary delete-button"
          @click="deleteJobRecord">Delete</a>
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
        <div class="tab-pane fade" :class="{ 'active show': isActive('tags') }" id="tags">
          <TagTab ref="tagTab"/>
        </div>
        <!--end of second tab-->
        <!--third tab-->
        <div class="tab-pane fade" :class="{ 'active show': isActive('portfolio') }" id="portfolio">
          <PortfolioTab ref="portfolioTab"/>
        </div>
        <!--end of third tab-->
    </div>
  </div>
</template>

<script src="../../modules/jobRecord/jobRecordDetail.js">
</script>

<style scoped  src="../../assets/css/jobRecord_create_detail.css">
</style>

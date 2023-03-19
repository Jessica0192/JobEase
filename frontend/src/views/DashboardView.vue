<template>
<div>
  <h1 class="view-title">Dashboard</h1>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <!--      FIRST ROW       -->
        <div class="row">
          <!--     TOP METRICS       -->
          <div class="col-lg-3 col-md-6 col-12" v-for="(metric, index) in metrics" :key="index">
            <div class="mb-4 card">
              <div class="p-3 card-body d-flex justify-content-between align-items-center flex-column">
                <p class="mb-0 text-sm text-uppercase align-self-start metric-title">{{metric.title}}</p>
                <h5 class="fw-semibold text-center">{{metric.value}}</h5>
              </div>
            </div>
          </div>
          <!--      SECOND ROW       -->
          <div class="row">
            <!--      JOB CREATED OVERVIEW LINE CHART       -->
            <div class="col-lg-7 mb-lg">
              <div class="card z-index-2">
                <div class="card">
                  <div class="pb-0 card-header mb-0">
                    <h6>Job Created Overview</h6>
                    <p class="text-sm">
                      <span class="current-year-percentage" id="currentYearPercentage"></span>
                    </p>
                  </div>
                  <div class="p-3 card-body">
                    <div class="chart">
                      <canvas id="chart-line" class="chart-canvas"
                              height="375" style="display: block;
                              box-sizing: border-box; height: 300px; width: 803px;" width="1004"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--      BOX ON THE RIGHT SIDE OF LINE CHART       -->
            <div class="col-lg-5">
              <div class="card card-carousel overflow-hidden h-100 p-0">

              </div>
            </div>
          </div>
          <!--      THIRD ROW       -->
          <div class="row mt-4">
            <!--      JOB RECORDS TABLE       -->
            <div class="col-lg-7 mb-lg-0 mb-4">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2">Job Records</h6>
                  </div>
                </div>
                <div class="job-table-container">
                  <div class="table-responsive">
                    <table class="table" >
                      <tbody>
                        <tr v-for="(job, index) in jobs" :key="index">
                          <td >
                            <div>
                              <div class="ms-4">
                                <p class="mb-0 text-xs job-record-label">Name:</p>
                                <label class="job-record-data mb-0">{{ job.job_title }}</label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p class="mb-0 text-xs job-record-label">Status:</p>
                              <label class="job-record-data mb-0" >{{ job.status.status_name }}</label>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p class="mb-0 text-xs job-record-label">Last updated:</p>
                              <label class="job-record-data mb-0">{{formattedDatetime(job.updated_at)}}</label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!--      JOB TAGS TABLE       -->
            <div class="col-lg-5">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <h6 class="mb-2">Tags</h6>
                </div>
                <div class="p-3 card-body">
                  <div class="row">
                    <div class="col">
                      <ul class="list-group"
                          v-for="(tag, index) in tags.slice(0, Math.ceil(tags.length/2))"
                          :key="index">
                        <li class="mb-1 border-0 list-group-item d-flex justify-content-between">
                            <div class="d-flex flex-column">
                              <div class="d-flex align-items-center" style="text-align: left;">
                                <h6 class="me-3 tag-label">{{ tag.tag_name }}</h6>
                                <span class="tag-num-label" >{{ tag.num_of_items_for_tag }}</span>
                              </div>
                            </div>
                        </li>
                      </ul>
                    </div>
                    <div class="col">
                      <ul class="list-group"
                          v-for="(tag, index) in tags.slice(Math.ceil(tags.length/2))"
                          :key="index">
                        <li class="mb-1 border-0 list-group-item d-flex justify-content-between">
                            <div class="d-flex flex-column">
                              <div class="d-flex align-items-center" style="text-align: left;">
                                <h6 class="me-3 tag-label">{{ tag.tag_name }}</h6>
                                <span class="tag-num-label">{{ tag.num_of_items_for_tag }}</span>
                              </div>
                            </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script src="@/modules/dashboard"/>

<style scoped src="@/assets/css/dashboard.css"/>

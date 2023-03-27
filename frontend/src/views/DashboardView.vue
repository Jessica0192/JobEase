<template>
  <div>
    <h1 class="view-title">Dashboard</h1>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <!--      FIRST ROW       -->
          <div class="row">
            <!--     TOP METRICS       -->
            <div class="col-lg-3 col-md-6 col-12" v-for="(metric, index) in metrics" :key="index">
              <div class="mb-4 card">
                <div class="p-3 card-body d-flex justify-content-between align-items-center flex-column">
                  <p class="mb-0 text-sm text-uppercase align-self-start metric-title">{{metric.title}}</p>
                  <h5 class="fw-bold text-center">{{metric.value}}</h5>
                </div>
              </div>
            </div>
            <!--      SECOND ROW       -->
            <div class="row">
              <!--      JOB CREATED LINE CHART       -->
              <div class="col-lg-7 mb-lg">
                <div class="card ">
                  <div class="card">
                    <div class="pb-0 card-header mb-0">
                      <h6>Job Created</h6>
                      <p class="text-sm">
                        <span class="current-year-percentage" id="currentYearPercentage"></span>
                      </p>
                    </div>
                    <div class="p-3 card-body">
                      <div class="chart">
                        <canvas id="chart-line" class="chart-canvas"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="card card-carousel overflow-hidden h-100">
                   <div id="carousel" class="carousel-container carousel slide h-100" data-bs-ride="carousel">
                      <Carousel>
                        <CarouselItem v-for="(item, index) in carouselItems" :key="index">
                          <div class="carousel-item h-100 active" :style="{ backgroundImage: 'url(' + item.image + ')', backgroundSize: 'cover' }">
                            <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                              <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                                <i class="ni ni-camera-compact text-dark opacity-10"></i>
                              </div>
                              <h4 class="text-white mb-1">Get started with JobEase</h4>
                              <p>{{ item.quote }}</p>
                            </div>
                          </div>
                        </CarouselItem>
                      </Carousel>
                     <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                       <font-awesome-icon :icon="faChevronLeft()" />
                       <span class="visually-hidden">Previous</span>
                     </button>
                     <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                       <font-awesome-icon :icon="faChevronRight()" />
                       <span class="visually-hidden">Next</span>
                     </button>
                  </div>
                </div>
              </div>
            </div>
            <!--      THIRD ROW       -->
            <div class="row mt-4">
              <!--      TAGS DONUT CHART       -->
              <div class="col-lg-7 mb-lg-0 mb-4">
                <div class="card">
                  <div class="pb-0 card-header mb-0">
                    <h6>Tags</h6>
                  </div>
                  <div class="p-3 card-body">
                    <apexcharts type="donut"
                                :options="pieChartOptions" :series="pieChartSeries"></apexcharts>
                  </div>
                </div>
              </div>
              <!--      JOB RECORDS TABLE       -->
              <div class="col-lg-5">
                <div class="card">
                  <div class="p-3 pb-0 card-header">
                   <div class="d-flex justify-content-between">
                      <h6 class="mb-2">Job Records</h6>
                    </div>
                  </div>
                  <div class="job-table-container">
                    <div class="table-responsive">
                      <table class="table">
                        <tbody v-if="jobs.length > 0">
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
                        <tbody v-else>
                          <td>
                            <div>
                              <h6 >There's no data currently</h6>
                            </div>
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-12">
                <div class="card h-100 p-0">
                  <div class="p-3 pb-0 card-header">
                    <div class="d-flex justify-content-between">
                      <h6 class="mb-2">Upcoming Events</h6>
                    </div>
                  </div>
                  <div class="upcoming-events-table-container">
                    <div class="table-responsive">
                      <table class="table" >
                        <tbody v-if="upcomingEvents.length > 0">
                          <tr v-for="(event, index) in upcomingEvents" :key="index">
                            <td >
                              <div>
                                <div class="ms-4">
                                  <p class="mb-0 text-xs job-record-label">Title:</p>
                                  <label class="job-record-data mb-0">{{ event.title }}</label>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <p class="mb-0 text-xs job-record-label">Start Date:</p>
                                <label class="job-record-data mb-0" >{{ formattedDatetime(event.start) }}</label>
                              </div>
                            </td>
                            <td>
                              <div>
                                <p class="mb-0 text-xs job-record-label">End Date:</p>
                                <label class="job-record-data mb-0">{{ formattedDatetime(event.end) }}</label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <td>
                            <div>
                              <h6 >There's no data currently</h6>
                            </div>
                          </td>
                        </tbody>
                      </table>
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

<style scoped src="../assets/css/dashboard.css"/>

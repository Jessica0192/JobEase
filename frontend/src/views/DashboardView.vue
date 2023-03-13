<template>
<div>
  <h1 class="view-title">Dashboard</h1>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12" v-for="(metric, index) in metrics" :key="index">
            <div class="mb-4 card">
              <div class="p-3 card-body d-flex justify-content-between align-items-center flex-column">
                <p class="mb-0 text-sm text-uppercase align-self-start">{{metric.title}}</p>
                <h5 class="fw-semibold text-center" style="color: darkslateblue">{{metric.value}}</h5>
              </div>
            </div>
          </div>
          <div class="row">
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
            <div class="col-lg-5">
              <div class="card card-carousel overflow-hidden h-100 p-0">
                <div id="carouselExampleCaptions" class="carousel slide h-100" data-bs-ride="carousel">
                  <div class="carousel-inner border-radius-lg h-100">
                    <div class="carousel-item h-100 active"
                         style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-camera-compact text-dark opacity-10"></i>
                        </div><h5 class="text-white mb-1">Get started with Argon</h5>
                        <p>There’s nothing I really wanted to do in life that I wasn’t able to get good at.</p>
                      </div>
                    </div>
                    <div class="carousel-item h-100" style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-bulb-61 text-dark opacity-10"></i>
                        </div>
                        <h5 class="text-white mb-1">Faster way to create web pages</h5>
                        <p>That’s my skill. I’m not really specifically talented at anything except for the ability to learn.</p>
                      </div>
                    </div>
                    <div class="carousel-item h-100" style="background-size: cover;">
                      <div class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5">
                        <div class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3">
                          <i class="ni ni-trophy text-dark opacity-10"></i>
                        </div>
                        <h5 class="text-white mb-1">Share with us your design tips!</h5>
                        <p>Don’t be afraid to be wrong because you can’t learn anything from a compliment.</p>
                      </div>
                    </div>
                  </div>
                  <button class="carousel-control-prev w-5 me-3" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button><button class="carousel-control-next w-5 me-3"
                                   type="button" data-bs-target="#carouselExampleCaptions"
                                   data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-lg-7 mb-lg-0 mb-4">
              <div class="card">
                <div class="p-3 pb-0 card-header">
                  <div class="d-flex justify-content-between">
                    <h6 class="mb-2">Job Records</h6>
                  </div>
                </div>
                <div class="job-table-container">
                  <div class="table-responsive">
                    <table class="table align-items-center">
                      <tbody>
                        <tr v-for="(job, index) in jobs" :key="index">
                          <td class="w-30">
                            <div class="px-2 py-1 d-flex align-items-center">
                              <div class="ms-4">
                                <p class="mb-0 text-xs job-record-label">Name:</p>
                                <label class="job-record-data mb-0">{{ job.job_title }}</label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="text-center">
                              <p class="mb-0 text-xs job-record-label">Status:</p>
                              <label class="job-record-data mb-0">{{ job.status.status_name }}</label>
                            </div>
                          </td>
                          <td>
                            <div class="text-center">
                              <p class="mb-0 text-xs job-record-label">Portfolio:</p>
                              <label class="job-record-data mb-0"
                                     v-if="job.portfolio !== null">{{ job.portfolio.portfolio_name }}</label>
                            </div>
                          </td>
                          <td class="text-sm">
                            <div class="text-center">
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
                              <div class="d-flex align-items-center">
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
                              <div class="d-flex align-items-center">
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

<script>
import Chart from 'chart.js/auto';
import {jobRecordApi} from '@/services/JobRecordApi'
import {dashboardApi} from '@/services/DashboardApi'
export default {
  data(){
    return{
      jobs: [],
      metrics: [],
      tags:[
        {
          tag_name: "Interviewed",
          num_of_items_for_tag: 10
        },
        {
          tag_name: "Interested",
          num_of_items_for_tag: 34
        },
        {
          tag_name: "Offer received",
          num_of_items_for_tag: 5
        }
      ]
    }
  },
  async mounted () {
    // Job Records
    await jobRecordApi.getAllJobRecords().then(response => {
      if (response && response.status === 200) {
        this.jobs = response.data;
      }
    });

    //Tags Count
    // await dashboardApi.getAllJobRecordsTagCountForUser().then(response => {
    //   if (response && response.status === 200) {
    //     this.tags = response.data;
    //   }
    // });

    this.drawLineChartWithData();
    this.addMetricsData();
  },
  unmounted () {
    this.chart.destroy();
  },
  methods:{
    formattedDatetime(isoDatetime) {
      const date = new Date(isoDatetime)
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    },
    addMetricsData(){
      this.metrics = [
        {
          title: "Total Job Records",
          value: `${this.jobs.length}`
        },
          {
          title: "Sample 1",
          value: `something 1`
        },
          {
          title: "Sample 2",
          value: `something 2`
        },
          {
          title: "Sample 3",
          value: `something 3`
        }
      ]
    },
    drawLineChartWithData(){
      // PERCENTAGE TEXT AT THE TOP OF GRAPH
      // Get the current year's data point and calculate its percentage
      const currentYear = new Date().getFullYear();
      const jobsThisYear = this.jobs.filter(job => new Date(job.created_at).getFullYear() === currentYear);
      const usagePercentage = Math.round((jobsThisYear.length / this.jobs.length) * 100);
      const arrowIcon = usagePercentage < 100 ?
      '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>' :
      '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>';
      document.getElementById('currentYearPercentage').innerHTML = `<b>${usagePercentage}%</b> ${arrowIcon} in ${new Date().getFullYear()}`;

      // DRAW LINE GRAPH
      // Group jobs by month
      const jobsByMonth = this.jobs.reduce((acc, job) => {
        const month = new Date(job.created_at).getMonth();
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      // Initialize dataPoints array with 0 values for each month
      const dataPoints = new Array(12).fill(0);

      // Populate dataPoints array with actual job counts
      Object.keys(jobsByMonth).forEach(month => {
        dataPoints[month] = jobsByMonth[month];
      });

      const ctx = document.getElementById('chart-line').getContext('2d');
      const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Created jobs',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataPoints,
            lineTension: 0.4
          },
        ],
      };

      this.chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          elements: {
            point: {
              radius: 0, // set the radius to 0 to remove the dots
            },
          },
          plugins: {
            tooltip: {
              enabled: true, // enable the tooltip
              intersect: false, // show the tooltip for all data points that intersect with the mouse
              mode: 'nearest', // show the tooltip for the data point that is closest to the mouse
            },
            legend: {
              display: false, // to remove the legend
            },
          },
          scales: {
            // set the x-axis grid lines to be hidden
            x: {
              grid: {
                display: false,
              },
            },
            // set the y-axis grid lines to be dashed
            y: {
              grid: {
                borderDash: [2],
                borderWidth: 1,
              },
              suggestedMin: 1,
              suggestedMax: 5,
              ticks: {
                stepSize: 1
              }
            },
          },
        },
      });

      // resize the chart when the window size changes
      window.addEventListener('resize', () => {
        this.chart.resize();
      });
    }
  }
}
</script>

<style scoped>
.job-record-data {
  color: #212529;
  font-size: 1rem;
}
.job-record-label,
.tag-label,
.current-year-percentage{
  color: 	#888888;
}
.tag-num-label{
  color: darkgoldenrod;
  font-size: 1.2rem;
  margin-bottom: 7px;
  font-weight: bold;
}
.list-group-item{
  margin-bottom: 0px;
}

/* Job Records Table Style */
.job-table-container {
  height: 350px; /* set the height of the container */
  overflow-y: scroll; /* add a vertical scrollbar */
}
.table-responsive {
  width: 100%; /* make the table fill the container */
}
</style>

import Chart from 'chart.js/auto';
import VueApexCharts from "vue3-apexcharts";
import {jobRecordApi} from '@/services/JobRecordApi'
import {dashboardApi} from '@/services/DashboardApi'
import {portfolioApi} from '@/services/PortfolioApi'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  data(){
    return{
      jobs: [],
      portfoliosCount: 0,
      upcomingEvents: [],
      metrics: [],
      tags:[],
      carouselItems: [
        {
          image: 'https://images.unsplash.com/photo-1514241516423-6c0a5e031aa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VucmlzZXxlbnwwfHwwfHw%3D&w=1000&q=80',
          quote: '"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle." - Christian D. Larson'
        },
        {
          image: 'https://media.istockphoto.com/id/495902924/photo/path-at-sunset.jpg?s=612x612&w=0&k=20&c=mXNMTcfm-piaUaLaoiRWRFJgbedTQOGjAAg8F-8P-0w=',
          quote: '"Believe you can and you\'re halfway there." - Theodore Roosevelt'
        },
      ],

      // pie chart options
      pieChartSeries: [],
      pieChartOptions: {
        // chart options
        chart: {
          type: 'donut',
          height: 415
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  },
  components:{
    apexcharts: VueApexCharts,
    FontAwesomeIcon
  },
  async created () {
    // Job Records
    await jobRecordApi.getAllJobRecords().then(response => {
      if (response && response.status === 200) {
        this.jobs = response.data;
      }
    });

    // Portfolio
    await portfolioApi.getAllPortfoliosForUser().then(response => {
      if (response && response.status === 200) {
        this.portfoliosCount = response.data.length;
      }
    });

    // Upcoming Events
    await dashboardApi.getUpcomingEventsForUser().then(response => {
      if (response && response.status === 200) {
        this.upcomingEvents = response.data;
      }
    });

    //Tags Count
    await dashboardApi.getAllJobRecordsTagCountForUser().then(response => {
      if (response && response.status === 200) {
        this.tags = response.data;
      }
    });

    this.addDataIntoPieChart();

    this.drawLineChartWithData();

    this.addMetricsData();
  },
  methods:{
    faChevronLeft () {
      return faChevronLeft
    },
    faChevronRight () {
      return faChevronRight
    },
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
          title: "Total Upcoming Events",
          value: `${this.upcomingEvents.length}`
        },
          {
          title: "Total Portfolios",
          value: `${this.portfoliosCount}`
        }
      ]
    },
    drawLineChartWithData(){
      // PERCENTAGE TEXT AT THE TOP OF GRAPH
      // Get the current year's data point and calculate its percentage
      const currentYear = new Date().getFullYear();
      const jobsThisYear = this.jobs.filter(job => new Date(job.created_at).getFullYear() === currentYear);
      const usagePercentage = (!Math.round((jobsThisYear.length / this.jobs.length) * 100)) ? 0 : Math.round((jobsThisYear.length / this.jobs.length) * 100);
      const arrowIcon = usagePercentage < 100 ?
      '<i class="fa fa-arrow-down text-danger" aria-hidden="true"></i>' :
      '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>';
      document.getElementById('currentYearPercentage').innerHTML = `<b>${usagePercentage}%</b> ${arrowIcon} in ${new Date().getFullYear()}`;

      // DRAW LINE GRAPH
      // Group jobs by month
      const jobsByMonth = this.jobs.reduce((acc, job) => {
        const month = new Date(job.created_at).getMonth();
        const year = new Date(job.created_at).getFullYear();
        if (year === currentYear) {
          acc[month] = (acc[month] || 0) + 1;
        }
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
    },
    addDataIntoPieChart () {
      const tagData = this.tags.map(tag => ({
        x: tag.tag_name,
        y: tag.num_of_items_for_tag,
      }));

      this.pieChartSeries = tagData.map(tag => tag.y);
      this.pieChartOptions = {
        ...this.pieChartOptions,
        labels: tagData.map(tag => tag.x)
      }

      // add style different if all tags have 0 counts
      if (this.pieChartSeries.every((value) => value === 0)) {
        this.pieChartOptions = {
          ...this.pieChartOptions,
          colors: ['#CCCCCC'],
        }
        this.pieChartOptions.labels.unshift('All 0')
        this.pieChartSeries = [1]
      }
    }
  }
}

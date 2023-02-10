<template>
  <div style="display: flex; justify-content: space-between;">
    <h1 class="view-title">Job Record Detail</h1>
    <a style="margin-right: 170px" href="javascript:void(0)"
       class="btn btn-lg btn-primary save-button"
      @click="saveJobRecord">Save</a>
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
        <div v-if="job" class="tab-pane fade" :class="{ 'active show': isActive('jobInfo') }" id="jobInfo">
            <div class="jobInfoContainer">
              <div>
                <table class="table table-bordered" style="width: 70%;margin-left: 0;">
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <div style="display: flex;">
                        <label style="color: darkred; width: 10%">*</label>
                        <label style="width: 90%">Job Title</label>
                      </div>
                    </td>
                    <td style="width: 50%;" >
                      <input type="text" :class="{ 'fill-red': !job.job_title }" v-model="job.job_title" />
                    </td>
                    <td style="width: 20%;">
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <div style="display: flex;">
                        <label style="color: darkred; width: 10%">*</label>
                        <label style="width: 90%">Job Status</label>
                      </div>
                    </td>
                    <td style="width: 40%;">
                      <select v-model="job.job_status" :class="{ 'fill-red': !job.job_status }">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Deadline Date</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="datetime-local" v-model="job.deadline_date" />
                    </td>
                    <td style="width: 35%;text-align: right;">
                      <label>Interview Date</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="datetime-local" v-model="job.interview_date" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Organization</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" v-model="job.organization_name" />
                    </td>
                    <td style="width: 20%;text-align: right;">
                      <label>Salary</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="number" v-model="job.salary" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Job Url</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" v-model="job.job_url" />
                    </td>
                    <td style="width: 20%;text-align: right;">
                      <label>Location</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" step="0.01" v-model="job.location"/>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Note</label>
                    </td>
                    <td style="width: 90%;">
                      <textarea v-model="job.notes" rows="3" cols="60"></textarea>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
        </div>
      <!--end of first tab-->
      <!--second tab-->
      <div class="tab-pane fade" :class="{ 'active show': isActive('tags') }" id="tags">
        Tags
      </div>
      <!--end of second tab-->
      <!--third tab-->
      <div class="tab-pane fade" :class="{ 'active show': isActive('portfolio') }" id="portfolio">
        Portfolio
      </div>
      <!--end of thrid tab-->
    </div>
  </div>
</template>

<script>
import {api} from '@/services/JobRecordApi'
import router from '@/router'

export default {
  name: 'JobRecordDetailView',
  data() {
    return {
      job: null,
      activeItem: 'jobInfo'
    };
  },
  created() {
    // call fetchJob method to get data by calling api endpoint and update UI
    this.fetchJob();
  },
  methods: {
    openTagModal() {
      // Add your logic for opening the tag modal here
    },
    // this is for tab appearance
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    // this is for tab appearance
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    // call getJobRecordById endpoint and fill out fields in UI
    async fetchJob() {
     const id = this.$route.params.id;

      // this is api call
      try {
        await api.getJobRecordByID(id).then(response => {
           this.job = response.data;
         });
      } catch (error) {
        console.error(error);
      }
    },
    async saveJobRecord () {
      if(this.job.job_title !== '')   //include tag later in if statement
      {
        // save Job Record by api call and navigate to Job Record page
        let deadlineDateTime = new Date(this.job.deadline_date);
        let interviewDateTime = new Date(this.job.interview_date);

        const inputs = {
            job_title: this.job.job_title,
            deadline_date: deadlineDateTime.toISOString(),
            interview_date: interviewDateTime.toISOString(),
            organization_name: this.job.organization_name,
            salary: +(this.job.salary),
            notes: this.job.notes,
            job_url: this.job.job_url,
            location: this.job.location
          }
          console.log(inputs)

        // update Job Record api logic hasn't been created on backend
        // api.updateJobRecord(JSON.stringify(inputs)).then(response => {
        //   console.log(response.data)
        //   if(response.status===200) {
        //     router.push({ name: 'JobRecords'})
        //   }
        // });
        await router.push({ name: 'JobRecords'})
      } else {
        alert("Please fill out all required fields")
      }

    }
  },
};
</script>

<style scoped>
.jobInfoContainer {
  display: flex;
  justify-content: flex-start;
}
td {
  text-align: left;
  padding: 5px;
}
/*fill with red when field is empty*/
.fill-red {
  background-color: rgba(220,20,60,0.2);
}
</style>

<template>
  <div style="display: flex; justify-content: space-between;">
    <h1 class="view-title">Create Job Record</h1>
    <a style="margin-right: 170px" href="javascript:void(0)"
       class="btn btn-lg btn-primary create-button"
      @click="createJobRecord">Create</a>
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
        <div class="tab-pane fade" :class="{ 'active show': isActive('jobInfo') }" id="jobInfo">
            <div class="jobInfoContainer">
              <div>
                <table class="table table-bordered" style="width: 100%;margin: 0;">
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <div style="display: flex;">
                        <label style="color: darkred; width: 10%">*</label>
                        <label style="width: 90%">Job Title</label>
                      </div>
                    </td>
                    <td style="width: 50%;">
                      <input type="text" :class="{ 'fill-red': !jobTitle }" v-model="jobTitle" />
                    </td>
                    <td style="width: 20%;">
                      <!-- Add content here -->
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
                      <select v-model="jobStatus" :class="{ 'fill-red': !jobStatus }">
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
                      <input type="datetime-local" v-model="deadlineDate" />
                    </td>
                    <td style="width: 35%;text-align: right;">
                      <label>Interview Date</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="datetime-local" v-model="interviewDate" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Organization</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" v-model="organization" />
                    </td>
                    <td style="width: 20%;text-align: right;">
                      <label>Salary</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="number" step="0.01" v-model="salary" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Job Url</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" v-model="jobUrl" />
                    </td>
                    <td style="width: 20%;text-align: right;">
                      <label>Location</label>
                    </td>
                    <td style="width: 20%;">
                      <input type="text" v-model="location" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 25%; text-align: right;">
                      <label>Note</label>
                    </td>
                    <td style="width: 90%;">
                      <textarea v-model="note" rows="3" cols="60"></textarea>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
        </div>
      <!--end of first tab-->
      <!--second tab-->
      <!--badge: https://getbootstrap.com/docs/4.0/components/badge/-->
      <div class="tab-pane fade" :class="{ 'active show': isActive('tags') }" id="tags">
        <a href="#" class="badge badge-primary big-badge">Primary</a>
        <a href="#" class="badge badge-secondary">Secondary</a>
        <a href="#" class="badge badge-success">Success</a>
        <a href="#" class="badge badge-danger">Danger</a>
        <a href="#" class="badge badge-warning">Warning</a>
        <a href="#" class="badge badge-info">Info</a>
        <a href="#" class="badge badge-light">Light</a>
        <a href="#" class="badge badge-dark">Dark</a>
      </div>
      <!--end of second tab-->
      <!--third tab-->
      <div class="tab-pane fade" :class="{ 'active show': isActive('portfolio') }" id="portfolio">
        Portfolio
      </div>
      <!--end of third tab-->
    </div>
  </div>
</template>

<script>
import {api} from '@/services/JobRecordApi'
import router from '@/router'

export default {
  data() {
    return {
      jobTitle: '',
      jobStatus: '',
      deadlineDate: '',
      interviewDate: '',
      organization: '',
      salary: '',
      jobUrl: '',
      location: '',
      note: '',
      activeItem: 'jobInfo'
    };
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
    // create job record by calling api end point and navigate to Job Record page
    async createJobRecord () {
      if(this.jobTitle !== '')    //include tag later in if statement
      {
        // save Job Record by api call and navigate to Job Record page
        let deadlineDateTime = new Date(this.deadlineDate);
        let interviewDateTime = new Date(this.interviewDate);

        const inputs = {
            job_title: this.jobTitle,
            deadline_date: deadlineDateTime.toISOString(),
            interview_date: interviewDateTime.toISOString(),
            organization_name: this.organization,
            salary: +(this.salary),
            notes: this.note,
            job_url: this.jobUrl,
            location: this.location
          }
          console.log(inputs)

        api.createJobRecord(JSON.stringify(inputs)).then(response => {
          console.log(response.data)
          if(response.status===200) {
            router.push({ name: 'JobRecords'})
          }
        });
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
.big-badge {
  font-size: 15px;
  padding: 10px 30px;
}
</style>

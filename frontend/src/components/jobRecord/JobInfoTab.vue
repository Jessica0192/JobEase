<template>
  <div v-if="job" class="jobInfoContainer" id="jobInfo">
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
            <select v-model="job.status.status_name"
                    :class="{ 'fill-red': !job.status || Object.keys(job.status).length === 0 }">
              <option v-for="status in statusOptions" :key="status.status_name" :value="status.status_name">{{ status.status_name }}</option>
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
            <label>Description</label>
          </td>
          <td style="width: 90%;">
            <textarea v-model="job.description" rows="3" cols="60"></textarea>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {jobStatusApi} from '@/services/JobStatusApi'

export default {
  name: 'JobInfoTab',
  data() {
    return{
      job: {
        job_title: "",
        status: {},
        description: "",
        deadline_date: "",
        interview_date: "",
        organization_name: "",
        salary: 0,
        job_url: "",
        location: "",
        tags: [
          {}
        ],
        portfolio: {}
      },
      statusOptions: [],  // status data with status_name and id
    }
  },
  props: {
    detailViewJobProp: {
      type: Object,
      required: false,
      default: () => ({
        job_title: "",
        status: {},
        description: "",
        deadline_date: "",
        interview_date: "",
        organization_name: "",
        salary: 0,
        job_url: "",
        location: "",
        tags: [
          {}
        ],
        portfolio: {}
      })
    }
  },
  watch: {
    detailViewJobProp: {
      handler(newVal) {
        // Use the data from the parent component
        this.job = newVal
      },
      immediate: true
    }
  },
  mounted () {
    jobStatusApi.getAllStatus().then(response => {
      if (response && response.status === 200 && Array.isArray(response.data)) {
        this.statusOptions = response.data
      }
    });
  }
}
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

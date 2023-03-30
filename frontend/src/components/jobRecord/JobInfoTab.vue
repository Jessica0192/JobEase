<template>
  <div v-if="job" class="jobInfoContainer" id="jobInfo">
    <div>
      <table class="table table-bordered" style="margin-left: 0;">
        <tr>
          <td style="">
            <div style="display: flex;">
              <label style="color: darkred; width: 10%">*</label>
              <label style="width: 90%">Job Title</label>
            </div>
          </td>
          <td style="" >
            <input type="text" :class="{ 'fill-red': !job.job_title }" v-model="job.job_title" />
          </td>
        </tr>
        <tr>
          <td style="">
            <div style="display: flex;">
              <label style="color: darkred; width: 10%">*</label>
              <label style="width: 90%">Job Status</label>
            </div>
          </td>
          <td style=";">
            <select v-model="job.status.status_name"
                    :class="{ 'fill-red': !job.status || Object.keys(job.status).length === 0 }">
              <option v-for="status in statusOptions" :key="status.status_name" :value="status.status_name">{{ status.status_name }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td style="">
            <label>Deadline Date</label>
          </td>
          <td style=";">
            <input type="datetime-local" v-model="job.deadline_date" />
          </td>
          <td style="">
            <label>Interview Date</label>
          </td>
          <td style="">
            <input type="datetime-local" v-model="job.interview_date" />
          </td>
        </tr>
        <tr>
          <td style="">
            <label>Organization</label>
          </td>
          <td style="">
            <input type="text" v-model="job.organization_name" />
          </td>
          <td style="">
            <label>Salary</label>
          </td>
          <td style="">
            <input type="number" v-model="job.salary" />
          </td>
        </tr>
        <tr>
          <td style="">
            <label>Job Url</label>
          </td>
          <td style=";">
            <input type="text" v-model="job.job_url" />
          </td>
          <td style="">
            <label>Location</label>
          </td>
          <td style="">
            <input type="text" step="0.01" v-model="job.location"/>
          </td>
        </tr>
        <tr>
          <td style="">
            <label>Description</label>
          </td>
          <td style="">
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
  overflow: hidden;
  width: 100%;
}
td {
  text-align: left;
  padding: 5px;
}
/*fill with red when field is empty*/
.fill-red {
  background-color: rgba(220,20,60,0.2);
}
label{
  text-align: left;
}
input, select, textarea {
    width:100%;
}
/* adjust layout for small screens */
@media screen and (max-width: 1270px) {
  .jobInfoContainer {
    display: flex;
    justify-content: flex-start;
    margin-left: 0;
    overflow: hidden;
    width: 100%;
  }
  td {
    display:inline-block;
    padding:5px;
    width:100%;
  }
}

@media screen and (max-width: 320px) {
  input, select, textarea {
    width:80%;
  }
}
@media screen and (max-width: 280px) {
  input, select, textarea {
    width:70%;
  }
}
@media screen and (max-width: 260px) {
  input, select, textarea {
    width:65%;
  }
}
@media screen and (max-width: 240px) {
  input, select, textarea {
    width:55%;
  }
}
@media screen and (max-width: 220px) {
  input, select, textarea {
    width:45%;
  }
}
</style>





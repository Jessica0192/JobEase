<template>
   <h1 class="view-title">{{ job.jobTitle }}</h1>
   <p>{{job.id}}</p>
</template>

<script>
// import {api} from '@/services/JobRecordApi'

export default {
  name: 'JobRecordDetailView',
  data() {
    return {
      job: null,
    };
  },
  created() {
    this.fetchJob();
  },
  methods: {
    fetchJob() {
     this.job = {
       "id": "0",
       "jobStatus": "Interested",
       "tags": ["Tag1", "Tag2", "Tag3"],
       "jobTitle": "Job 1",
       "notes": "This is a note",
       "created_at": "2023-02-08T16:12:31.333Z",
       "updated_at": "2023-02-08T16:12:31.333Z"
     }

     const id = this.$route.params.id;
     console.log(id)
      // try {
      //   api.getJobRecordByID(id).then(response => {
      //      this.job = response.data;
      //    });
      // } catch (error) {
      //   console.error(error);
      // }
    },
  },
};
</script>

<style scoped>

</style>

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
        <div class="selected-badges">
          <a aria-placeholder="Selected Tags" v-for="(selectedTag, index) in selectedTags" :key="index" href="#" class="badge padded-badge" :class="selectedTag.class" @click="removeTag(selectedTag)">{{ selectedTag.tag_name }}</a>
        </div>
        <br/>
        <div class="badge-list">
          <a v-for="(tag, index) in tags" :key="index" href="#" class="badge padded-badge" :class="tag.class" @click="selectTag(tag)">{{ tag.tag_name }}</a>
        </div>
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

<script src="../../modules/jobRecord/createJobRecord.js">
</script>

<style scoped  src="../../assets/css/jobRecord_create_detail.css">
</style>

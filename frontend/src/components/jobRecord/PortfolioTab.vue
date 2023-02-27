<template>
<div class="container mt-4">
    <div class="row">
      <div >
        <!--     Portfolio Radio Button Options      -->
        <div class="d-flex justify-content-lg-start" style="justify-items: flex-start">
          <div class="form-check" style="margin-right: 10px;">
            <input class="form-check-input" type="radio" name="portfolio-option" id="select-existing-portfolio" value="select-existing" v-model="portfolioOption">
            <label class="form-check-label" for="select-existing-portfolio">
              Select from existing portfolio
            </label>
          </div>
          <div class="form-check" style="margin-right: 50px;">
            <input class="form-check-input" type="radio" name="portfolio-option" id="create-new-portfolio" value="create-new" v-model="portfolioOption">
            <label class="form-check-label" for="create-new-portfolio">
              Create new portfolio
            </label>
          </div>
        </div>
        <span style="color:darkred;font-size:4mm" v-if="portfolioMsg.failed">{{`* ${portfolioMsg.failed}`}}</span>
        <!--    End of Portfolio Dropdown Options    -->
        <br>
        <hr>
        <br>
        <div v-if="portfolioOption === 'select-existing'">
          <div class="form-group row">
            <label for="portfolio-select" class="col-sm-2 col-form-label">Select Portfolio:</label>
            <div class="col-sm-9">
              <select id="portfolio-select" class="form-control" v-model="selectedPortfolio">
                <option selected value="">--Select a portfolio--</option>
                <option v-for="portfolio in portfolios" :key="portfolio.id" :value="portfolio.id">{{ portfolio.name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row">
            <div class="col-md-6  mb-3">
              <div class="form-group row">
                <label for="portfolio-name" class="col-sm-3 col-form-label">Portfolio Name:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="portfolio-name" v-model="newPortfolioName">
                </div>
              </div>
              <br/>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Resources: </label>
                <div class="card col-sm-9" style="height: 100px">
                  <div class="card-body">
                    <div v-for="resource in resources" :key="resource.id">
                      <input type="checkbox" v-model="selectedResources" :value="resource.id">
                      <span>{{ resource.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-inline">
                <div class="form-group row">
                  <label for="resource-type" class="col-sm-3 col-form-label">Resource Type:</label>
                  <div class="col-sm-9">
                    <select id="resource-type" class="form-control" v-model="newResourceType">
                      <option selected value="">--Select a type--</option>
                      <option v-for="type in resourceTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="file-input" class="col-sm-3 col-form-label">Choose Files:</label>
                  <div class="col-sm-5">
                    <input type="file" id="file-input" ref="fileInput" @change="onFileChange">
                  </div>
                  <div class="col-sm-4 d-flex justify-content-end">
                    <button type="button" class="btn btn-sm btn-primary delete-button" @click="addResource">Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6  mb-3">
              <h5>Selected Resources</h5>
              <div class="card" style="height: 250px">
                <div class="card-body">
                  <ul>
                    <li v-for="resource in selectedResources" :key="resource.id">
                      {{ resource.name }}
                      <a style="float: right" href="#!" role="button" @click="removeResource(resource)">
                        <MDBIcon size="lg" class="fas fa-window-close text-muted "
                               id="deleteIcon"
                               data-mdb-toggle="tooltip" title="Delete"></MDBIcon>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div class="form-group">
            <button type="button" class="btn btn-group-sm btn-primary" @click="createPortfolio">Create Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBIcon  } from "mdb-vue-ui-kit";
export default {
  name: 'PortfolioTab',
  components:{
    MDBIcon
  },
  data(){
    return {
      // portfolios data
      portfolios: [],
      resources: [],
      selectedResources: [],
      resourceTypes: ['Resume', 'Cover Letter', 'Video', 'Audio'],
      selectedPortfolio: "",
      portfolioOption: 'select-existing',
      newPortfolioName: "",
      newResourceType: "",
      newResourceFile: null,
      newPortfolioResources: [],
      newResourceName: "",
      newPortfolioType: "",
      portfolioMsg: []
    }
  },
  mounted () {
    this.getPortfolios();
    this.getResources();
    this.getResourceTypes();
  },
  methods: {
    // Portfolios
      getPortfolios () {
        // API call to get list of portfolios
      },
      getResources () {
        // API call to get list of resources
      },
      getResourceTypes () {
        // API call to get list of resource types
      },
      createPortfolio () {
        // API call to create new portfolio with selected resources and type
        if(this.newPortfolioName && this.selectedResources.length !==0) {
          // API call to create new portfolio and select new portfolio from portfolios and set selectedPortfolio to new one

          // reset all inputs & return to select-existing option
          this.portfolioMsg.failed = ""
          this.portfolioOption = 'select-existing'
        } else {
          this.portfolioMsg.failed = "Require portfolio name and at least one resources"
        }
      },
      addResource() {
        if(this.selectedResources.some(obj => obj.name.includes(this.newResourceName))) {
          this.portfolioMsg.failed = "Selected Resources already contains resource with the same name"
        } else if (this.newResourceType && this.newResourceFile !== null) {
          const newResource = {
            id: Math.random().toString(36).substr(2, 9),
            name: this.newResourceName,
            type: this.newResourceType,
            file: this.newResourceFile
          };
          this.selectedResources.push(newResource);
          this.newResourceType = '';
          this.newResourceFile = [];

          // Reset file input element
          this.$refs.fileInput.value = '';
        } else {
          this.portfolioMsg.failed = "Require file type and one source"
        }
      },
      removeResource(resource) {
        // Find the index of the resource in the selectedResources array
        const index = this.selectedResources.findIndex(r => r.id === resource.id);
        if (index !== -1) {
          // Remove the resource from the selectedResources array
          this.selectedResources.splice(index, 1);
        }
      },
      onFileChange(e) {
          this.newResourceFile = [...e.target.files];
          const file = event.target.files[0]
          this.newResourceName = file.name
      },
  }
}
</script>

<style scoped>
label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

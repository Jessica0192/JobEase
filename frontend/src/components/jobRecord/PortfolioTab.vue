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
                <option v-for="portfolio in portfolios" :key="portfolio.id" :value="portfolio">{{ portfolio.portfolio_name }}</option>
              </select>
            </div>
            <br><br><br>
            <div v-if="selectedPortfolio">
              <label for="portfolio-select" class="align-content-start col-form-label fw-semibold">Resources inside portfolio:</label>
              <ul class="col-sm-11 resource-list">
                <li class="resource-item" v-for="(resource, index) in selectedPortfolio.resources" :key="index" @click="selectResource(resource)">
                  <span class="resource-name">{{ resource.resource_name }}</span>
                  <span class="resource-type">{{ resource.resource_type.resource_type }}</span>
                </li>
              </ul>
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
                <div class="card col-sm-9" style="height: 200px">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search resources" v-model="searchQuery">
                  </div>
                  <div class="card-body" style="overflow-y: auto">
                    <div v-for="resource in filteredResources" :key="resource.id" class="resource-item">
                      <input type="checkbox" v-model="selectedResources" :value="resource" class="resource-checkbox">
                      <span class="resource-name" style="font-size: 14px">{{ resource.resource_name }}</span>
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
                      <option v-for="type in resourceTypes" :key="type.id" :value="type">{{ type.resource_type }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="file-input" class="col-sm-3 col-form-label">Choose Files:</label>
                  <div class="col-sm-5">
                    <input type="file" :accept="acceptTypes" id="file-input" ref="fileInput" @change="onFileChange">
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
                <div class="card-body" style="overflow-y: auto">
                  <ul>
                    <li v-for="resource in selectedResources" :key="resource.id">
                      {{ resource.resource_name }}
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
            <button type="submit" class="btn btn-primary" @click="createPortfolio">Create Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBIcon  } from "mdb-vue-ui-kit";
import { portfolioApi } from '@/services/PortfolioApi'
import { fileApi } from '@/services/FileApi'
import { displaySelectedResource } from '@/modules/portfolio/portfolios';

export default {
  name: 'PortfolioTab',
  components:{
    MDBIcon
  },
  data(){
    return {
      // properties for UI
      searchQuery: "",
      portfolioOption: 'select-existing',
      portfolioMsg: [],
      // portfolios data
      portfolios: [],
      resources: [],
      selectedResources: [],
      resourceTypes: [],
      acceptableResourceExtensions: [],
      selectedPortfolio: "",
      newPortfolioName: "",
      newResourceType: "",
      newResourceFile: null,
      newPortfolioType: ""
    }
  },
  mounted () {
    this.getPortfolios();
    this.getResources();
    this.getResourceTypes();
    this.acceptableResourceExtensionTypes();
  },
  computed: {
    filteredResources() {
      return this.resources.filter(resource => {
        return resource.resource_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    acceptTypes() {
      return this.acceptableResourceExtensions
        .map(ext => ext.resource_extension_type)
        .join(',');
    }
  },
  methods: {
      // get initial data for existing portfolios, resources and types of resources
      async getPortfolios () {
        // API call to get list of portfolios
        await portfolioApi.getAllPortfoliosForUser().then(response => {
          if (response && response.status === 200) {
              this.portfolios = response.data
            }
        })
      },
      async getResources () {
        // API call to get list of resources
        await fileApi.getAllResources().then(response=> {
          if (response && response.status === 200) {
            this.resources = response.data
          }
        })
      },
      async getResourceTypes () {
        // API call to get list of resource types
        await fileApi.getFileType().then(response=> {
          if (response && response.status === 200) {
            this.resourceTypes = response.data
          }
        })
      },
      async acceptableResourceExtensionTypes() {
        // API call to get list of acceptable resource extension types
        await fileApi.getFileExtension().then(response=> {
          if (response && response.status === 200) {
            this.acceptableResourceExtensions = response.data
          }
        })
      },
      // whenever user clicks 'Create Portfolio' button to create new portfolio
      async createPortfolio () {
        if(this.newPortfolioName && this.selectedResources.length !==0) {
          const data = {
            portfolio_name: this.newPortfolioName,
            resource_ids: this.selectedResources.map(resource => resource.id)
          }

          // API call to create new portfolio and select new portfolio from portfolios and set selectedPortfolio to new one
          await portfolioApi.createPortfolio(data).then(async response => {
            if (response && response.status === 200) {
              // reset all inputs & return to select-existing option
              this.portfolioMsg.failed = ""
              this.portfolioOption = 'select-existing'
              await this.getPortfolios()
              this.selectedPortfolio = this.portfolios.find(portfolio => portfolio.id === response.data.id);
              this.resetAllInputsFromCreateNewPortfolio()
            }
            else if(response && response.status === 409) {
              this.portfolioMsg.failed = "Portfolio with the same name already exists. Please change portfolio name to something else"
            }
          })
        } else {
          this.portfolioMsg.failed = "Require portfolio name and at least one resources"
        }
      },

      // whenever user click 'Add' button to add resource
      addResource() {
        if (this.newResourceType && this.newResourceFile !== null) {
          const formData = new FormData()
          formData.append('file', this.newResourceFile)

          let lastDotIndex = this.newResourceFile.name.lastIndexOf(".");
          let fileExtension = this.newResourceFile.name.substr(lastDotIndex).toString().toLowerCase();
          let fileExtensionId = this.acceptableResourceExtensions.find(x=>x.resource_extension_type === fileExtension)?.id

          // API CALL
          if(fileExtensionId !== undefined) {
              fileApi.uploadFile(this.newResourceType.id, fileExtensionId, formData).then(response=> {
              if (response && response.status === 200) {
                const newResource = {
                  resource_name: response.data.resource_name,
                  id: response.data.id
                };

                // add newly created file into selectedResources
                this.selectedResources.push(newResource);

                // reset file inputs
                this.newResourceType = '';
                this.$refs.fileInput.value = '';

              } else if (response && response.status === 409) {
                this.portfolioMsg.failed = "Selected resource already exists in Resources"
              }
            })
          } else {
            this.portfolioMsg.failed = "Selected resource extension type is not acceptable"
          }
        } else {
          this.portfolioMsg.failed = "Require file type and a source"
        }
      },

      // whenever 'x' icon is clicked from Selected Resource box
      removeResource(resource) {
        // API CALL
        // Find the index of the resource in the selectedResources array
        const index = this.selectedResources.findIndex(r => r.resource_name === resource.resource_name);
        if (index !== -1) {
          // Remove the resource from the selectedResources array
          this.selectedResources.splice(index, 1);
        }
      },

      // whenever selected file from File Explorer has changed
      onFileChange() {
          this.newResourceFile = event.target.files[0]
      },

      // resets all inputs from Create New Portfolio section
      resetAllInputsFromCreateNewPortfolio(){
        this.newPortfolioName = "";
        this.selectedResources = [];
      },

      // when resource is selected from list of resources inside Portfolio
      selectResource(resource){
        displaySelectedResource(resource)
      }
  }
}
</script>

<style scoped>
label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.resource-item {
  display: flex;
  align-items: center;
}
.resource-checkbox {
  margin-right: 10px;
}
.resource-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* resource list in portfolio */
.resource-list {
  list-style: none;
  margin: 0;
  padding-left: 40px;
}
.resource-item {
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #dee2e6;
}
.resource-item:last-child {
  border-bottom: none;
}
.resource-item:hover {
  background-color: #e9ecef;
}
.resource-name {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}
.resource-type {
  padding-left: 10px;
  display: block;
  font-size: 12px;
  color: #888;
}
button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 20px;
}
</style>

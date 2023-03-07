import PortfolioCreationModal from '../../views/portfolio/PortfolioCreationModal.vue';
import { portfolioApi } from '@/services/PortfolioApi'
import { fileApi } from '@/services/FileApi'
import { MDBIcon  } from "mdb-vue-ui-kit";
export default {
  components:{
      PortfolioCreationModal,
      MDBIcon
  },
  data(){
    return {
      // properties for UI
      searchQuery: "",
      portfolioMsg: [],
      resources: [],
      selectedResources: [],
      resourceTypes: [],
      acceptableResourceExtensions: [],
      newPortfolioName: "",
      newResourceType: "",
      newResourceFile: null
    }
  },
  mounted () {
    this.getResources()
    this.getResourceTypes()
    this.acceptableResourceExtensionTypes()
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
                this.resetAllInputsFromCreateNewPortfolio()
                this.$emit("close-modal")
                location.reload()
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
      }
  }
}

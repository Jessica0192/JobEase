import { MDBIcon  } from "mdb-vue-ui-kit";
import {portfolioApi} from '@/services/PortfolioApi'

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
        portfolioApi.getAllPortfoliosForUser().then(response => {
          if (response && response.status === 200) {
              this.portfolios = response
            }
        })
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
          // portfolioApi.createPortfolio().then(response => {
          //   if (response && response.status === 200) {
          //       // reset all inputs & return to select-existing option
                 this.portfolioMsg.failed = ""
                 this.portfolioOption = 'select-existing'
          //     }
          // })


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

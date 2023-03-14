import PortfolioViewModal from '../../views/portfolio/PortfolioViewModal.vue';
import PortfolioCreationModal from '../../views/portfolio/PortfolioCreationModal.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import {portfolioApi} from '@/services/PortfolioApi';
import {fileApi} from "@/services/FileApi";
import {AxiosHeaders} from "axios";
import JSZip from 'jszip';
export default {
  components: {
    PortfolioViewModal,
    PortfolioCreationModal,
    ConfirmationDialog
  },
    data() {
      return {
        portfolios: [],
        resourcesToShow: [],
        export: "",
        portfolioIdToDelete: null,
        sortAscending: true,
        isViewModalVisible: false,
        isCreateModalVisible: false,
        openDeleteConfirmDialog: false
      };
    },
    async mounted(){
      await this.loadPortfolios()
    },
    methods: {
      // This function sorts an array of data objects, stored in the property "data" of the current object.
      // The sorted array is stored in the local variable "sortedDataArray".
      // The sorting is done using the JavaScript built-in "sort" method and
      //  a comparison function that compares the "portfolioName" property of two data objects (a and b).
      // If the property "sortAscending" is true, the function sorts the data objects in ascending order based on their "portfolioName" property,
      //  using the "localeCompare" method. If "sortAscending" is false, the function sorts the data objects in descending order.
      sortData() {
        let sortedDataArray = this.portfolios.slice();
        sortedDataArray.sort((a, b) => {
          if (this.sortAscending) {
            return a.portfolio_name.localeCompare(b.portfolio_name);
          } else {
            return b.portfolio_name.localeCompare(a.portfolio_name);
          }
      });
      this.portfolios = sortedDataArray;
      this.sortAscending = !this.sortAscending;
      },
      async loadPortfolios () {
        const response = await portfolioApi.getAllPortfoliosForUser()
        this.portfolios = response.data
      },
      openDeletePortfolioDialog(index){
        this.portfolioIdToDelete = this.portfolios[index].id
        this.openDeleteConfirmDialog = true
      },
      // To delete the row of table
      remove() {
        portfolioApi.deletePortfolio(this.portfolioIdToDelete).then(response => {
          if(response && response.status === 200){
            location.reload()
          }
        })
      },
      // Trigger opening the portfolio creation dialog
      newPortfolio () {
        this.isCreateModalVisible = true
      },
      // Download the entire portfolio as a zip file
      async downloadOnClick (index) {
        const resources = this.portfolios[index].resources

        downloadPortfolio(resources, this.portfolios[index].portfolio_name)
      },
      viewPortfolio (index) {
        this.resourcesToShow = this.portfolios[index].resources
        this.isViewModalVisible = true
      },
      // This method is responsible for displaying the resources of the portfolio on the browser
      onResourceSelected(resource){
        displaySelectedResource(resource)
      },
      exportData() {
        this.export = JSON.stringify(this.data);
      }
    }
  }


// This method is responsible for displaying the resources of the portfolio on the browser
// this method is also referenced from portfolioTab.js
export async function displaySelectedResource(resource){
  let NameExtension = resource.resource_name.split('.').pop()
  if ( NameExtension.toString().toLowerCase() !== 'docx') {
    const response = await fileApi.displayFile (resource.id)
    const headers = response.headers

    if(headers instanceof AxiosHeaders) {
      // Convert the response data to a blob
      const blob = new Blob([response.data], { type: headers.getContentType() })
      const fileUrl = URL.createObjectURL(blob)
      window.open(fileUrl, '_blank')
    } else {
      alert("Issue occurred while trying to retrieve content-type from resource")
    }
  }
  else {
    alert('Sorry! This type of file cannot be displayed.\n' +
        'Please download the file from the Resources tab to be able to view it!')
  }
}

// Download the entire portfolio as a zip file
export async function downloadPortfolio (resources, portfolioName) {
  const zip = new JSZip();

  for (const resource of resources) {
    try {
      const response = await fileApi.downloadFile (resource.id)
      zip.file(resource.resource_name, response.data)
    } catch (error) {
      console.error('Error retrieving resource:', error)
    }
  }

  // zip all resources and trigger download
  zip.generateAsync({type: 'blob'}).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = portfolioName + '.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  });
}

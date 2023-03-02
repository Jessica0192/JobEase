import PortfolioViewModal from '../../views/portfolio/PortfolioViewModal.vue';
import PortfolioCreationModal from '../../views/portfolio/PortfolioCreationModal.vue';
import {portfolioApi} from '@/services/PortfolioApi';
import {fileApi} from "@/services/FileApi";
import {AxiosHeaders} from "axios";
import JSZip from 'jszip';
export default {
  components: {
    PortfolioViewModal,
    PortfolioCreationModal
  },
    data() {
      return {
        portfolios: [],
        resourcesToShow: [],
        export: "",
        sortAscending: true,
        isViewModalVisible: false,
        isCreateModalVisible: false
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
      // To delete the row of table
      remove(index) {
        portfolioApi.deletePortfolio(this.portfolios[index].id).then(response => {
          if(response && response.status === 200){
            alert("Successfully deleted the Portfolio")
            location.reload()
          }
        })
      },
      // Trigger opening the portfolio creation dialog
      newPortfolio () {
        this.isCreateModalVisible = true
      },
      // Download the entire portfolio as a zip file
      async downloadPortfolio (index) {
        const resources = this.portfolios[index].resources
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
          a.download = this.portfolios[index].portfolio_name + '.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
      },
      viewPortfolio (index) {
        this.resourcesToShow = this.portfolios[index].resources
        this.isViewModalVisible = true
      },
      // This method is responsible for displaying the resources of the portfolio on the browser
      async onResourceSelected(resource){
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
      },
      exportData() {
        this.export = JSON.stringify(this.data);
      }
    }
  }
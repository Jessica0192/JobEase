import PortfolioViewModal from '../../views/portfolio/PortfolioViewModal.vue'
import {portfolioApi} from '@/services/PortfolioApi'
import {fileApi} from "@/services/FileApi";
import {AxiosHeaders} from "axios";
export default {
  components: {
    PortfolioViewModal
  },
    data() {
      return {
        portfolios: [],
        resourcesToShow: [],
        export: "",
        sortAscending: true,
        isModalVisible: false
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
      // TODO: send and API request to create a portfolio and save it the database
      newPortfolio () {
        alert('need a page or pop up for adding new portfolio')
      },
      // TODO: send and API request to download a portfolio from the database
      downloadPortfolio (row) {
        alert('portfolio downloaded', row)
      },
      viewPortfolio (index) {
        this.resourcesToShow = this.portfolios[index].resources
        this.isModalVisible = true
      },
      exportData() {
        this.export = JSON.stringify(this.data);
      },
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
          alert('Sorry! This type of file cannot be displayed.\nPlease download the file to be able to view it!')
        }
      }
    }
  }
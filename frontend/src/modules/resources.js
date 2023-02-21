import ResourcePopup from '../views/ResourcePage/ResourcePopup.vue'
import { fileApi } from '../services/FileApi'
export default {
  components: {
    ResourcePopup
  },
    data() {
      return {
        options: ['Resume', 'Cover Letter', 'Image', 'Audio', 'Video', 'Others'],
        sortAscending: true,
        NameOfPage: '',
        isPopupVisible: false,
        resources: [],
        export: ""
      };
    },
    async mounted () {
      await this.loadResources()
    },
    methods: {
      // This function sorts an array of data objects, stored in the property "data" of the current object. 
      // The sorted array is stored in the local variable "sortedDataArray".
      // The sorting is done using the JavaScript built-in "sort" method and
      //  a comparison function that compares the "portfolioName" property of two data objects (a and b).
      // If the property "sortAscending" is true, the function sorts the data objects in ascending order based on their "portfolioName" property,
      //  using the "localeCompare" method. If "sortAscending" is false, the function sorts the data objects in descending order.
      async loadResources () {
        this.resources = await fileApi.getAllResources()
      },
      sortData() {
        let sortedDataArray = this.data.slice();
        sortedDataArray.sort((a, b) => {
          if (this.sortAscending) {
            return a.resourceName.localeCompare(b.resourceName);
          } else {
            return b.resourceName.localeCompare(a.resourceName);
          }
      });
      this.data = sortedDataArray;
      this.sortAscending = !this.sortAscending;
      },
      // To delete the row of table
      remove(index) {
        console.log('delete', this.resources[index].id)
        fileApi.deleteFile(this.resources[index].id)
        this.resources.splice(index, 1);
      },
      exportData () {
        this.export = JSON.stringify(this.data);
      },
      // TODO: fix the URL
      async downloadFile (index) {
        // To wait for the DOM to be updated
        await this.$nextTick()
        await fileApi.downloadFile (this.data[index].resourceId)
      },
      // TODO: send and API request to retrieve a resource from database 
      viewFile (index) {
        // Get the URL of the file from the data array
        const fileUrl = this.data[index].fileLink;

        // Create an XHR request to get the file data as a blob
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileUrl);
        xhr.responseType = 'blob';

        xhr.onload = () => {
          if (xhr.status === 200) {
            // Create a blob from the file data
            const blob = new Blob([xhr.response], { type: xhr.getResponseHeader('Content-Type') })

            // Create a URL for the blob
            const blobUrl = URL.createObjectURL(blob)

            // Open the URL in a new window
            window.open(blobUrl);
          } else {
            console.error(`Failed to load file: ${fileUrl}`)
          }
        }

        xhr.send()
      },
      selectOption(option, row) {
        row.selectedOption = option
        row.isOpen = false
      },
      showPopup() {
        this.isPopupVisible = true;
      },
      hidePopup() {
        this.isPopupVisible = false;
      }
    }
  }
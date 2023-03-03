import ResourcePopup from '../../views/ResourcePage/ResourcePopup.vue'
import { fileApi } from '../../services/FileApi'
import {AxiosHeaders} from 'axios'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
export default {
  components: {
    ResourcePopup,
    ConfirmationDialog
  },
    data() {
      return {
        options: ['Resume', 'Cover Letter', 'Image', 'Audio', 'Video', 'Others'],
        sortAscending: true,
        NameOfPage: '',
        isPopupVisible: false,
        resources: [],
        resourceDisplayed: null,
        export: "",
        openDeleteConfirmDialog: false,
        fileIdToDelete: null
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
        const resourcesRsp = await fileApi.getAllResources()
        this.resources = resourcesRsp.data
        console.log('this.resources ', this.resources )
      },
      sortData() {
        let sortedDataArray = this.resources.slice()
        sortedDataArray.sort((a, b) => {
          if (this.sortAscending) {
            return a.resource_name.localeCompare(b.resource_name)
          } else {
            return b.resource_name.localeCompare(a.resource_name)
          }
        })
        this.resources = sortedDataArray
        this.sortAscending = !this.sortAscending
      },
      openDeleteFileDialog(index){
        this.fileIdToDelete = this.resources[index].id
        this.openDeleteConfirmDialog = true
      },
      // To delete the row of table
      async remove(index) {
        fileApi.deleteFile(this.fileIdToDelete).then(response => {
          if(response && response.status === 200){
            this.resources.splice(index, 1)
          }
        })
        // await fileApi.deleteFile(this.fileIdToDelete)
        // this.resources.splice(index, 1)
      },
      exportData () {
        this.export = JSON.stringify(this.data)
      },
      async downloadFile (index) {
        let fileType = this.resources[index].resource_extension_type.resource_extension_type
        let filename = this.resources[index].resource_name
        // To wait for the DOM to be updated
        await this.$nextTick()
        try {
          const response = await fileApi.downloadFile (this.resources[index].id)
          const headers = response.headers

          if(headers instanceof AxiosHeaders) {
            fileType = headers.getContentType()
          }

          // Convert the response data to a blob
          const blob = new Blob([response.data], { type: fileType })

          // Create a URL for the blob
          const objectUrl = URL.createObjectURL(blob)

          // Create a link to download the file
          const link = document.createElement('a')
          link.href = objectUrl
          link.download = filename
          document.body.appendChild(link)

          // Click the link to download the file
          link.click()

          // Clean up resources
          URL.revokeObjectURL(objectUrl)
          document.body.removeChild(link)
        } catch (error) {
          console.error('Error downloading file:', error)
        }
      },
      // To display a file content on a browser
      async viewFile (index) {
        let NameExtension = this.resources[index].resource_name.split('.').pop()
        if ( NameExtension.toString().toLowerCase() !== 'docx') {
          const response = await fileApi.displayFile (this.resources[index].id)

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

      },
      selectOption(option, row) {
        row.selectedOption = option
        row.isOpen = false
      },
      showPopup() {
        this.isPopupVisible = true
      },
      hidePopup() {
        this.isPopupVisible = false
      }
    }
  }

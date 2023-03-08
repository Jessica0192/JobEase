import { fileApi } from '@/services/FileApi'
export default {
  name:'resourcePopup',
  // When the component is mounted, load resources
  async mounted () {
    await this.loadResources()
  },
  // Initialize component data
  data () {
    return {
      fileType: '',
      fileTypeDb: [],
      fileTypeDbId: '',
      fileExtension: [],
      fileExtensionId: '',
      file: null
    }
  },
  // Define computed properties
  computed: {
    // Check whether all the required fields have been filled
    isSaveDisabled() {
      return !(this.fileType && this.file)
    },
    acceptTypes() {
      return this.fileExtension
        .map(ext => ext.resource_extension_type)
        .join(',');
    }
  },
  methods: {
    // Load resource data from the file API
    async loadResources () {
      const typeRsp = await fileApi.getFileType()
      const extensionRsp = await fileApi.getFileExtension()
      this.fileTypeDb = typeRsp.data
      this.fileExtension = extensionRsp.data
    },
    // Set the selected file in the component's data
    selectFile () {
      this.file = this.$refs.selectedFile.files[0]
    },
    // Reset the component's data to initial values
    resetForm() {
      this.fileType = ''
      this.file = null
      this.$refs.selectedFile.value = ''
    },
    closeWindow() {
      // Reload the current page
      location.reload();
      // Emit the "close" event to notify the parent component
      this.$emit('close');
    },
    // Save the selected file using the file API
    saveFile () {
      const formData = new FormData()
      formData.append('file', this.file)

      let lastDotIndex = this.file.name.lastIndexOf(".");
      let fileExtension = this.file.name.substr(lastDotIndex).toString().toLowerCase();
      let fileExtensionId = this.fileExtension.find(x=>x.resource_extension_type === fileExtension)?.id

      if(fileExtensionId !== undefined) {
        fileApi.uploadFile(this.fileType.id, fileExtensionId, formData).then(response => {
          if (response && response.status === 200) {
            alert('File has been saved successfully!')
          } else if (response && response.status === 409) {
            alert('This file is already exist! Please select another file or change the name!')
          }
        })
      } else {
        alert('Not acceptable file extension')
      }

      this.resetForm()
    }
  }
}

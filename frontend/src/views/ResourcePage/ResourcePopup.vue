<template>
  <div class="resourcePopup">
    <div class="popup-inner">
      <div class="popup-header">
      <h5>Add a Resource</h5>
      <a href="#!" @click="$emit('close')" title="close">
        <i class="fas fa-times close-icon" aria-hidden="true"></i>
      </a>
    </div>
      <slot />
      <table style="margin-top: 50px;">
        <tr >
          <td>
            <label style="margin-top: 5px;">File Type:</label>
          </td>
          <td>
            <select v-model="fileType" style="margin-top: 10px;" required>
              <option value="" disabled>-- Select --</option>
              <option v-for="fileTypeItem in fileTypeDb" :key="fileTypeItem.id" :value="fileTypeItem.resource_type">
                {{ fileTypeItem.resource_type }}
              </option>
            </select>
          </td>
        </tr>
        <tr >
          <td>
            <label style="margin-top: 5px;">File Format:</label>
          </td>
          <td>
            <select v-model="fileFormat" style="margin-top: 10px;" required>
              <option value="" disabled>-- Select --</option>
              <option v-for="fileFormatItem in fileExtension" :key="fileFormatItem.id" :value="fileFormatItem.resource_extension_type">
                {{ fileFormatItem.resource_extension_type }}
              </option>
            </select>
          </td>
        </tr>
      </table>
      <form @submit.prevent="saveFile" enctype="multipart/form-data" style="margin-top: 30px;">
        <div class="field">
          <input type="file" ref="selectedFile" @change="selectFile" required />
        </div>
        <div class="field">
          <button class="button is-info popup-saveBtn" :disabled="isSaveDisabled">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { fileApi } from '../../services/FileApi'
  export default {
    name:'resourcePopup',
    async mounted () {
      await this.loadResources()
    },
    data () {
      return {
        fileType: '',
        fileTypeDb: [],
        fileTypeDbId: '',
        fileFormat: '',
        fileExtension: [],
        fileExtensionId: '',
        file: null
      }
    },
    computed: {
      // Check whether all the required fields have been filled
      isSaveDisabled() {
        return !(this.fileType && this.fileFormat && this.file)
      },
    },
    methods: {
      async loadResources () {
        const typeRsp = await fileApi.getFileTypeId()
        const extensionRsp = await fileApi.getFileExtensionId()
        this.fileTypeDb = typeRsp.data
        this.fileExtension = extensionRsp.data
      },
      selectFile () {
        this.file = this.$refs.selectedFile.files[0]
      },
      resetForm() {
        this.fileType = ''
        this.fileFormat = ''
        this.file = null
      },
      saveFile () {
        const formData = new FormData()
        formData.append('file', this.file)
        let extensionFile = this.file.name.split('.').pop()
        let alowSave = false
        
        for (let j=0; j<this.fileTypeDb.length; j++){
          if (this.fileTypeDb[j].resource_type === this.fileType)
          {
            this.fileTypeDbId = this.fileTypeDb[j].id
            break
          }          
        }

        for (let k =0 ; k < this.fileExtension.length; k++) {
          if (extensionFile === 'docx') {
            alowSave = true
            break
          }
          if (extensionFile === 'jpg') {
            alowSave = true
            break
          }
          if (this.fileExtension[k].resource_extension_type.split('/').pop() === extensionFile) {
            alowSave = true
            break
          }
        }
        console.log(alowSave)

        if (alowSave) {
          for (let i = 0; i < this.fileExtension.length; i++) {
            let extensionDb = this.fileExtension[i].resource_extension_type.split('/').pop()
            if (extensionFile === 'docx') {
              extensionFile = 'plain'
            }
            if (extensionFile === 'jpg') {
              extensionFile = 'jpeg'
            }
            if (extensionDb === extensionFile) {
              this.fileExtensionId = this.fileExtension[i].id
              break 
            }
          }
          
          fileApi.uploadFile(this.fileTypeDbId, this.fileExtensionId, formData)
          this.resetForm()
        }
        else {
          alert('Please select a file with correct format!')
        }
      }
    }
  }
  </script>
  
  <style scoped>
.resourcePopup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    font-size: 15px;
  }

  .popup-header {
    background: #fff;
    height: 40px;
    padding-left: 10px;
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: dark;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .popup-inner {
    background-color: rgb(235, 233, 233);
    padding: 20px;
    max-width: 400px;
    width: 100%;
    height: 100%;
    text-align: left;
    position: relative;
    max-height: 250px;
  }
  
  .popup-saveBtn {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    right: 15px;
    background-color: lightgray;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    border: 1px solid rgb(124, 122, 122);
  }

  .button:hover {border-color: rgb(74, 109, 225); background-color:rgb(186, 220, 248)}
  .close-icon:hover {background-color: rgb(238, 102, 102); color: white;}

  .close-icon {
    position: absolute;
    top: 10px;
    right: 7px;
    margin-left: 100%;
    margin-bottom: 100%;
    color: rgb(72, 70, 70);
    padding-left: 5px;
    padding-right: 5px;
    font-size: 1.2em;
  }
</style>
  
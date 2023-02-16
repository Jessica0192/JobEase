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
        <tr>
          <td>
            <label>File Title:</label>
          </td>
          <td>
            <input type="text" v-model="fileTitle" required />
          </td>
        </tr>
        <tr >
          <td>
            <label style="margin-top: 5px;">File Type:</label>
          </td>
          <td>
            <select v-model="fileType" style="margin-top: 10px;" required>
              <option value="" disabled>-- Select --</option>
              <option>Resume</option>
              <option>Cover Letter</option>
              <option>Image</option>
              <option>Audio</option>
              <option>Video</option>
              <option>Others</option>
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
    data () {
      return {
        fileType: '',
        fileTitle: '',
        file: null
      }
    },
    computed: {
      // Check whether all the required fields have been filled
      isSaveDisabled() {
        return !(this.fileType && this.fileTitle && this.file)
      },
    },
    methods: {
      selectFile () {
        this.file = this.$refs.selectedFile.files[0]
        //console.log(this.file)
      },
      saveFile () {
        const formData = new FormData()
        formData.append('file', this.file)
        fileApi.uploadFile(formData)
        alert('File has been saved successfully!')
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
  
<template>
    <div class="resourcePopup">
      <div class="popup-inner">
        <slot />
        <form @submit.prevent="saveFile" enctype="multipart/form-data" style="margin-top: 40px;">
          <div class="field">
              <input type="file" ref="selectedFile" @change="selectFile"/>
          </div>
          <div class="field">
            <button class="button is-info popup-saveBtn">
              Save
            </button>
          </div>
        </form>
        <button class=" popup-closeBtn" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { fileApi } from '../../services/FileApi'
  export default {
    name:'resourcePopup',
    data () {
        return {
            fill: ''
        }
    },
    methods: {
      selectFile () {
        console.log('File selected')
        this.file = this.$refs.selectedFile.files[0]
        console.log(this.file)
      },
      saveFile () {
        if (this.file) {
          const formData = new FormData()
          formData.append('file', this.file)
          fileApi.uploadFile(formData)
        } else {
          // show an error message
          alert('Please select a file before saving')
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
  }
  
  .popup-inner {
    background: #fff;
    padding: 20px;
    max-width: 500px;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    max-height: 200px;
  }
  
  .popup-closeBtn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color:lightcoral;
    border-width: thin;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  .popup-saveBtn {
    position: absolute;
    bottom: 10px;
    right: 70px;
    background-color: lightgray;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .popup-closeBtn:hover {background-color: rgba(233, 57, 57, 0.888)}

  .button:hover {background-color: gray}

</style>
  
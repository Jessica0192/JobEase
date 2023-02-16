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
        <a href="#!" @click="$emit('close')" title="close">
          <i class="fas fa-times close-icon" aria-hidden="true"></i>
        </a>
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
  
  .popup-saveBtn {
    font-size: 20px;
    position: absolute;
    bottom: 15px;
    right: 20px;
    background-color: lightgray;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding-left: 20px;
    padding-right: 20px;
  }

  .button:hover {background-color: gray}

  .close-icon {
    position: absolute;
    top: 7px;
    right: 7px;
    margin-left: 100%;
    margin-bottom: 100%;
    color: red;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 5px;
    background: rgb(242, 239, 239);
    font-size: 1.2em;
  }
</style>
  
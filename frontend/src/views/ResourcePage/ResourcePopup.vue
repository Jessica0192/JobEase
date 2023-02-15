<template>
    <div class="resourcePopup">
      <div class="popup-inner">
        <slot />
        <form @submit.prevent="saveFile" enctype="multipart/form-data">
          <div class="field">

              <input type="file" ref="selectedFile" @change="selectFile"/>
          </div>
          <div class="field">
            <button class="button is-info">
              Save
            </button>
          </div>
        </form>
        <button class="popup-close" @click="$emit('close')">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
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
        async saveFile () {
          const formData = new FormData()
          formData.append('file', this.fill)

          try {
            await axios.post ('/upload', formData) 
          } catch (err) {
            console.log(err)
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
    text-align: center;
    position: relative;
  }
  
  .popup-close {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

</style>
  
<template>
  <div class="resourcePopup">
    <div class="popup-inner">
      <div class="popup-header">
      <h5>Add a Resource</h5>
      <a href="#!" @click="closeWindow" title="close">
        <i class="fas fa-times close-icon" aria-hidden="true"></i>
      </a>
    </div>
      <slot />
      <table style="margin-top: 45px;">
        <tr >
          <td>
            <label style="margin-top: 0px;">File Type:</label>
          </td>
          <td>
            <select v-model="fileType" style="margin-top: 0px;" required>
              <option value="" disabled>-- Select --</option>
              <option v-for="fileTypeItem in fileTypeDb" :key="fileTypeItem.id" :value="fileTypeItem">
                {{ fileTypeItem.resource_type }}
              </option>
            </select>
          </td>
        </tr>
      </table>
      <form @submit.prevent="saveFile" enctype="multipart/form-data" style="margin-top: 20px;">
        <div class="field">
          <input type="file" :accept="acceptTypes" ref="selectedFile" @change="selectFile" required />
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

<script src="../../modules/resources/resourcePopup.js">
</script>

<style scoped src="../../assets/css/popupWindow.css">
</style>

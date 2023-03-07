
import { remove } from '@vue/shared';

<template>
<!-- This code is a Vue.js component that creates a table to display resources.
 The table has five columns: "Resources Name", "Type", "View", "Download", and "Remove".
 The "Type" column has a dropdown menu that allows the user to select from different options.
 The "View" and "Download" columns have buttons that trigger events when clicked. 
 The "Remove" column has a button that removes a row from the table.
 The code uses the Vue.js directive v-for to loop through the data array and create a row in the table for each item in the array.
 The contenteditable attribute on the first column allows the user to edit the resource name directly in the table. 
 The v-if directive is used to show or hide the dropdown menu based on the value of row.isOpen.
 The code references an external JavaScript file "resources.js" and a stylesheet "table.css". 
 These files define the logic and styles for the component, respectively. -->
<div>
  <ConfirmationDialog
    style="align-content: center"
    v-if="openDeleteConfirmDialog"
    title="Confirmation"
    message="Are you sure you want to delete this record?"
    confirm-btn-label="Yes"
    :on-confirm="remove"
    @close-modal="openDeleteConfirmDialog = false; fileIdToDelete = null"
  />
  <h1 class="view-title">Resources</h1>
  <div class="card scrollable">
    <div class="card-body">
      <span>
        <a href="#!" @click="showPopup" title="Add new resource">
          <i class="fas fa-plus fa-2x sign-blue icon" aria-hidden="true"></i>
        </a>
      </span>
      <ResourcePopup v-if="isPopupVisible" @close="hidePopup">
      </ResourcePopup>
      <div id="table" class="table-editable">
        <table class="table table-responsive-md table-striped text-center">
          <thead>
            <tr>
              <th class="text-center">Resources Name
                <a href="#" @click="sortData" title="Sort resources">
                  <i class="fas fa-sort" aria-hidden="true"></i>
                </a>
              </th>
              <th class="text-center">Created Date</th>
              <th class="text-center">Type</th>
              <th class="text-center">View</th>
              <th class="text-center">Download</th>            
              <th class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(row, index) in resources" :key="index">
              <td class="pt-3-half" contenteditable="true">{{ this.resources.length ? this.resources[index].resource_name : '' }}</td>
              <td>{{ this.resources.length ? this.resources[index].updated_at : '' }}</td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-primary btn_type">{{ this.resources.length ? this.resources[index].resource_type.resource_type : '' }}</button>
                  <button type="button" class="btn btn-primary dropdown-toggle px-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="row.isOpen = !row.isOpen">
                  </button>
                </div>
                  <ul v-if="row.isOpen" class="customUl">
                    <li v-for="(option, index) in options" :key="index" @click="selectOption(option, row)">
                      {{ option }}
                    </li>
                  </ul>
              </td>
              <td>
                <span class="table-view" @click="viewFile(index)">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    view
                  </button>
                </span>
              </td>
              <td>
                <span class="table-download" @click="downloadFile(index)">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    Download
                  </button>
                </span>
                <div v-if="resourceDisplayed === index">
                    <iframe
                      ref="iframeViewer"
                      :src="fileUrl"
                      style="width: 100%; height: 600px;"
                      @load="onIframeLoad"
                    ></iframe>
                  </div>
              </td>
              <td>
                <span class="table-remove" @click="remove(index)" />
                <span class="table-remove" @click="openDeleteFileDialog(index)">
                  <button type="button" class="btn btn-danger btn-rounded btn-sm my-0">
                    Remove
                  </button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script src="../../modules/resources/resources.js">
</script>

<style scoped src="../../assets/css/table.css">
</style>

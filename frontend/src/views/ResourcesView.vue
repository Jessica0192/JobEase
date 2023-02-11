<template>
<div>
  <h1 class="view-title">Resources</h1>
  <div class="card scrollable">
    <div class="card-body">
      <span>
        <a href="#!" @click="newResource">
          <i class="fas fa-plus fa-2x sign-blue icon" aria-hidden="true"></i>
        </a>
      </span>
      <div id="table" class="table-editable">
        <table class="table table-bordered table-responsive-md table-striped text-center">
          <thead>
            <tr>
              <th class="text-center">Resources Name
                <a href="#" @click="sortData">
                  <i class="fas fa-sort" aria-hidden="true"></i>
                </a>
              </th>
              <th class="text-center">Type</th>
              <th class="text-center">View</th>
              <th class="text-center">Download</th>            
              <th class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(row, index) in data" :key="index">
              <td class="pt-3-half" contenteditable="true">{{ row.resourceName }}</td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-primary">{{ row.selectedOption }}</button>
                  <button type="button" class="btn btn-primary dropdown-toggle px-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="row.isOpen = !row.isOpen">
                  </button>
                  <ul v-if="row.isOpen">
                    <li v-for="(option, index) in options" :key="index" @click="selectOption(option, row)">
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <span class="table-view" @click="viewFile">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    view
                  </button>
                </span>
              </td>
              <td>
                <span class="table-download" @click="downloadFile">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    Download
                  </button>
                </span>
              </td>
              <td>
                <span class="table-remove" @click="remove(index)">
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

<script src="../modules/resources.js">
</script>

<style scoped src="../assets/css/table.css">
</style>

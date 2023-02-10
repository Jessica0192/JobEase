<template>
<div>
  <h1 class="view-title">Resources</h1>
  <div class="card scrollable">
    <div class="card-body">
      <span>
        <a href="#!" @click="newPortfolio">
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
                  <button type="button" class="btn btn-primary">{{ selectedOption }}</button>
                  <button type="button" class="btn btn-primary dropdown-toggle px-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="isOpen = !isOpen">
                  <span class="sr-only">Toggle Dropdown</span>
                  </button>
                  <ul v-if="isOpen">
                    <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
                      {{ option }}
                    </li>
                  </ul>
                </div>
              </td>
              <td>
                <span class="table-view"
                  ><button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    view
                  </button></span
                >
              </td>
              <td>
                <span class="table-download">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    Download
                  </button>
                </span>
              </td>
              <td>
                <span class="table-remove" @click="remove(index)"
                  ><button type="button" class="btn btn-danger btn-rounded btn-sm my-0">
                    Remove
                  </button></span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      data: [{ resourceName: 'Resource 1' }, { resourceName: 'Resource 2' }, { resourceName: 'Resource 3' }, { resourceName: 'Resource 4' }],
      options: ['PDF', 'DOCX', 'MP4'],
      selectedOption: 'PDF',
      isOpen: false,
      export: "",
      sortAscending: true,
      NameOfPage: ''
    };
  },
  methods: {
    sortData() {
      let sortedDataArray = this.data.slice();
      sortedDataArray.sort((a, b) => {
        if (this.sortAscending) {
          return a.resourceName.localeCompare(b.resourceName);
        } else {
          return b.resourceName.localeCompare(a.resourceName);
        }
    });
    this.data = sortedDataArray;
    this.sortAscending = !this.sortAscending;
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    newPortfolio () {
      alert('need a page or pop up for adding new portfolio')
    },
    exportData() {
      this.export = JSON.stringify(this.data);
    },
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
    }
  }
}
</script>

<style scoped src="../assets/css/table.css">
</style>

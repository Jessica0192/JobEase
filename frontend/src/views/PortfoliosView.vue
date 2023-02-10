<template>
<div>
  <h1 class="view-title">Portfolio</h1>
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
              <th class="text-center">Portfolio Name
                <a href="#" @click="sortData">
                  <i class="fas fa-sort" aria-hidden="true"></i>
                </a>
              </th>
              <th class="text-center">View</th>
              <th class="text-center">Download</th>            
              <th class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(row, index) in data" :key="index">
              <td class="pt-3-half" contenteditable="true">{{ row.portfolioName }}</td>
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
      data: [{ portfolioName: 'Portfolio 1' }, { portfolioName: 'Portfolio 2' }, { portfolioName: 'Portfolio 3' }, { portfolioName: 'Portfolio 4' }],
      export: "",
      sortAscending: true
    };
  },
  methods: {
    sortData() {
      let sortedDataArray = this.data.slice();
      sortedDataArray.sort((a, b) => {
        if (this.sortAscending) {
          return a.portfolioName.localeCompare(b.portfolioName);
        } else {
          return b.portfolioName.localeCompare(a.portfolioName);
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
    }
  }
}
</script>

<style scoped src="../assets/css/table.css">
</style>

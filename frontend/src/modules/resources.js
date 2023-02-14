export default {
    data() {
      return {
        data: [
          { resourceName: 'Resource 1', selectedOption: 'Select', fileLink: 'http://example.com/resource1.pdf', isOpen: false }, 
          { resourceName: 'Resource 2', selectedOption: 'Select', fileLink: 'http://example.com/resource2.pdf', isOpen: false }, 
          { resourceName: 'Resource 3', selectedOption: 'Select', fileLink: 'http://example.com/resource3.pdf', isOpen: false }, 
          { resourceName: 'Resource 4', selectedOption: 'Select', fileLink: 'http://example.com/resource4.pdf', isOpen: false }
        ],
        options: ['Resume', 'Cover Letter', 'Image', 'Audio', 'Video', 'Others'],
        sortAscending: true,
        NameOfPage: '',
        export: ""
      };
    },
    methods: {
      // This function sorts an array of data objects, stored in the property "data" of the current object. 
      // The sorted array is stored in the local variable "sortedDataArray".
      // The sorting is done using the JavaScript built-in "sort" method and
      //  a comparison function that compares the "portfolioName" property of two data objects (a and b).
      // If the property "sortAscending" is true, the function sorts the data objects in ascending order based on their "portfolioName" property,
      //  using the "localeCompare" method. If "sortAscending" is false, the function sorts the data objects in descending order.
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
      // To delete the row of table
      // TODO: send and API request to delete the resource from the database
      remove(index) {
        this.data.splice(index, 1);
      },
      // TODO: send and API request to create a resource and save it the database
      newResource () {
        alert('need a page or pop up for adding new Resource')
      },
      exportData () {
        this.export = JSON.stringify(this.data);
      },
      // TODO: send and API request to download a resource from the database
      downloadFile (row) {
        alert('file downloaded', row)
      },
      // TODO: send and API request to retrieve a resource from database 
      viewFile (row) {
        alert('file viewed', row)
      },
      selectOption(option, row) {
        row.selectedOption = option
        row.isOpen = false
      }
    }
  }
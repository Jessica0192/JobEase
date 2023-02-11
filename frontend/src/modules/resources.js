export default {
    data() {
      return {
        data: [
          { resourceName: 'Resource 1', selectedOption: 'PDF', fileLink: 'http://example.com/resource1.pdf', isOpen: false }, 
          { resourceName: 'Resource 2', selectedOption: 'PDF', fileLink: 'http://example.com/resource2.pdf', isOpen: false }, 
          { resourceName: 'Resource 3', selectedOption: 'PDF', fileLink: 'http://example.com/resource3.pdf', isOpen: false }, 
          { resourceName: 'Resource 4', selectedOption: 'PDF', fileLink: 'http://example.com/resource4.pdf', isOpen: false }
        ],
        options: ['PDF', 'DOC', 'MP3', 'MP4'],
        sortAscending: true,
        NameOfPage: '',
        export: ""
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
      newResource () {
        alert('need a page or pop up for adding new Resource')
      },
      exportData () {
        this.export = JSON.stringify(this.data);
      },
      downloadFile (row) {
        alert('file downloaded', row)
      },
      viewFile (row) {
        alert('file viewed', row)
      },
      selectOption(option, row) {
        row.selectedOption = option
        row.isOpen = false
      }
    }
  }
export default {
    data() {
      return {
        data: [{ portfolioName: 'Portfolio 1', portfolioLink: 'http://example.com/portfolio1.pdf' }, { portfolioName: 'Portfolio 2', portfolioLink: 'http://example.com/portfolio2.pdf' }, { portfolioName: 'Portfolio 3', portfolioLink: 'http://example.com/portfolio3.pdf' }, { portfolioName: 'Portfolio 4', portfolioLink: 'http://example.com/portfolio4.pdf' }],
        export: "",
        sortAscending: true
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
            return a.portfolioName.localeCompare(b.portfolioName);
          } else {
            return b.portfolioName.localeCompare(a.portfolioName);
          }
      });
      this.data = sortedDataArray;
      this.sortAscending = !this.sortAscending;
      },
      // To delete the row of table
      // TODO: send and API request to delete the portfolio from the database
      remove(index) {
        this.data.splice(index, 1);
      },
      // TODO: send and API request to create a portfolio and save it the database
      newPortfolio () {
        alert('need a page or pop up for adding new portfolio')
      },
      // TODO: send and API request to download a portfolio from the database
      downloadPortfolio (row) {
        alert('portfolio downloaded', row)
      },
      // TODO: send and API request to retrieve a portfolio from database 
      viewPortfolio (row) {
        alert('portfolio viewed', row)
      },
      exportData() {
        this.export = JSON.stringify(this.data);
      }
    }
  }
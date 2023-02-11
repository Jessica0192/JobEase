export default {
    data() {
      return {
        data: [{ portfolioName: 'Portfolio 1', portfolioLink: 'http://example.com/portfolio1.pdf' }, { portfolioName: 'Portfolio 2', portfolioLink: 'http://example.com/portfolio2.pdf' }, { portfolioName: 'Portfolio 3', portfolioLink: 'http://example.com/portfolio3.pdf' }, { portfolioName: 'Portfolio 4', portfolioLink: 'http://example.com/portfolio4.pdf' }],
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
      downloadPortfolio (row) {
        alert('portfolio downloaded', row)
      },
      viewPortfolio (row) {
        alert('portfolio viewed', row)
      },
      exportData() {
        this.export = JSON.stringify(this.data);
      }
    }
  }
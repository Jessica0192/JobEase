<template>
<!-- This is a code snippet for a portfolio management system in Vue.js.
 The code uses HTML, JavaScript, and CSS to create a responsive and user-friendly interface.
 The code defines a Vue component that displays a table of portfolios, with columns for the portfolio name, a "View" button, a "Download" button, and a "Remove" button.
 The table is created using the HTML table tag, and the table data is dynamically generated using the Vue.js directive v-for, which loops through an array of portfolio data and displays a row for each item in the array.
 The portfolio data is expected to be an array of objects, with each object having a property "portfolioName".
 The buttons in the table are implemented using the HTML button tag and are given classes to style them with CSS.
 The buttons are also attached with event listeners using the Vue.js directive @click, which trigger methods in the Vue component's JavaScript code when the buttons are clicked.
 The methods that are triggered include newPortfolio, viewPortfolio, downloadPortfolio, and remove, which perform actions such as adding a new portfolio, viewing a portfolio, downloading a portfolio, and removing a portfolio, respectively.
The styles for the table are defined in the CSS file "table.css". The CSS uses styles for the Bootstrap framework to create a clean and modern-looking user interface.
The CSS styles are scoped to this component using the scoped attribute in the style tag, so they won't affect other components in the application.
 -->
<PortfolioViewModal
  style="align-content: center"
  v-if="isViewModalVisible"
  :resources = "resourcesToShow"
  @resource-selected="onResourceSelected"
  @close-modal="isViewModalVisible = false; resourcesToShow = null"
/>
<ConfirmationDialog
  style="align-content: center"
  v-if="openDeleteConfirmDialog"
  title="Confirmation"
  message="Do you want to delete the portfolio?"
  confirm-btn-label="Yes"
  :on-confirm="remove"
  @close-modal="openDeleteConfirmDialog = false; portfolioIdToDelete = null"
/>
<div>
  <h1 class="view-title">Portfolio</h1>
  <div class="card scrollable">
    <div class="card-body">
      <span>
        <a href="#!" @click="newPortfolio" title="Add new portfolio">
          <i class="fas fa-plus fa-2x sign-blue icon" aria-hidden="true"></i>
        </a>
      </span>
      <PortfolioCreationModal
        style="align-content: center"
        v-if="isCreateModalVisible"
        @close-modal="isCreateModalVisible = false"
      />
      <div id="table" class="table-editable">
        <table class="table table-bordered table-responsive-md table-striped text-center">
          <thead>
            <tr>
              <th class="text-center">Portfolio Name
                <a href="#" @click="sortData" title="Sort portfolios">
                  <i class="fas fa-sort" aria-hidden="true"></i>
                </a>
              </th>
              <th class="text-center">View</th>
              <th class="text-center">Download</th>
              <th class="text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(portfolio, index) in portfolios" :key="portfolio.id">
              <td class="pt-3-half" contenteditable="false">{{ portfolio.portfolio_name }}</td>
              <td>
                <span class="table-view" @click="viewPortfolio(index)">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    view
                  </button>
                </span>
              </td>
              <td>
                <span class="table-download" @click="downloadOnClick(index)">
                  <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                    Download
                  </button>
                </span>
              </td>
              <td>
                <span class="table-remove" @click="openDeletePortfolioDialog(index)">
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

<script src="../../modules/portfolio/portfolios.js">
</script>

<style scoped src="../../assets/css/table.css">
</style>

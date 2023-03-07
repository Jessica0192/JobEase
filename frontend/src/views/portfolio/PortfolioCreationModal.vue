<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <h3>Create a new Portfolio</h3>
      <hr>
      <span style="color:darkred;font-size:4mm" v-if="portfolioMsg.failed">{{`* ${portfolioMsg.failed}`}}</span>
      <a href="#!" @click="$emit('close-modal')" title="close">
        <i class="fas fa-times close-icon" aria-hidden="true"></i>
      </a>
      <div class="row">
        <div class="col-md-6  mb-3">
          <div class="form-group row">
            <label for="portfolio-name" class="col-sm-3 col-form-label">Portfolio Name:</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="portfolio-name" v-model="newPortfolioName">
            </div>
          </div>
          <br/>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Resources: </label>
            <div class="card col-sm-9" style="height: 200px">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search resources" v-model="searchQuery">
              </div>
              <div class="card-body" style="overflow-y: auto">
                <div v-for="resource in filteredResources" :key="resource.id" class="resource-item">
                  <input type="checkbox" v-model="selectedResources" :value="resource" class="resource-checkbox">
                  <span class="resource-name">{{ resource.resource_name }}</span>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div class="form-inline">
            <div class="form-group row">
              <label for="resource-type" class="col-sm-3 col-form-label">Resource Type:</label>
              <div class="col-sm-9">
                <select id="resource-type" class="form-control" v-model="newResourceType">
                  <option selected value="">--Select a type--</option>
                  <option v-for="type in resourceTypes" :key="type.id" :value="type">{{ type.resource_type }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="file-input" class="col-sm-3 col-form-label">Choose Files:</label>
              <div class="col-sm-5">
                <input type="file" :accept="acceptTypes" id="file-input" ref="fileInput" @change="onFileChange">
              </div>
              <div class="col-sm-4 d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-primary delete-button" @click="addResource">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6  mb-3">
          <h5>Selected Resources</h5>
          <div class="card" style="height: 250px">
            <div class="card-body" style="overflow-y: auto">
              <ul class="selected-resource-list">
                <li class="selected-resource-item" v-for="resource in selectedResources" :key="resource.id">
                  {{ resource.resource_name }}
                  <a style="float: right" href="#!" role="button" @click="removeResource(resource)">
                    <MDBIcon size="lg" class="fas fa-window-close text-muted "
                           id="deleteIcon"
                           data-mdb-toggle="tooltip" title="Delete"></MDBIcon>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div class="form-group">
        <button type="button" class="btn btn-group-sm btn-primary" @click="createPortfolio">Create Portfolio</button>
      </div>
    </div>
  </div>
</template>

<script src="../../modules/portfolio/createPortfolio.js"/>

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center; /* horizontally center the modal */
  align-items: center; /* vertically center the modal */
  background-color: rgba(0, 0, 0, 0.5);
}
.overlay {
  opacity: 0.5;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.modal-card {
  position: relative;
  width: 1200px; /* fixed value */
  margin: 30px auto auto;
  top: 15%;
  padding: 20px;
  background-color: white;
  height: auto; /* updated property */
  z-index: 10;
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.resource-item {
  display: flex;
  align-items: center;
}
.resource-checkbox {
  margin-right: 10px;
}
.resource-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-icon:hover {background-color: rgb(238, 102, 102); color: white;}
.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  margin-left: 100%;
  margin-bottom: 100%;
  color: rgb(72, 70, 70);
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.8em;
}

.selected-resource-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.selected-resource-item {
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #dee2e6;
}
.selected-resource-item:last-child {
  border-bottom: none;
}
.selected-resource-item:hover {
  background-color: #e9ecef;
}
</style>

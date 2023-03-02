<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <h3>Resources</h3>
      <hr>
      <a href="#!" @click="$emit('close-modal')" title="close">
        <i class="fas fa-times close-icon" aria-hidden="true"></i>
      </a>
      <ul class="resource-list">
        <li class="resource-item" v-for="(resource, index) in resources" :key="index" @click="selectResource(resource)">
          <span class="resource-name">{{ resource.resource_name }}</span>
          <span class="resource-type">{{ resource.resource_type.resource_type }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    resources: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectResource(resource){
      this.$emit('resource-selected', resource)
    }
  }
};
</script>

<style scoped>
/* Styles for the modal component */
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
  width: 400px; /* fixed value */
  margin: 30px auto auto;
  top: 35%;
  transform: translateY(-50%);
  padding: 20px;
  background-color: white;
  height: auto; /* updated property */
  z-index: 10;
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.resource-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.resource-item {
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid #dee2e6;
}
.resource-item:last-child {
  border-bottom: none;
}
.resource-item:hover {
  background-color: #e9ecef;
}
.resource-name {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
}
.resource-type {
  display: block;
  font-size: 14px;
  color: #888;
}
.close-icon:hover {background-color: rgb(238, 102, 102); color: white;}
.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  margin-left: 100%;
  margin-bottom: 100%;
  color: rgb(72, 70, 70);
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.6em;
}
</style>

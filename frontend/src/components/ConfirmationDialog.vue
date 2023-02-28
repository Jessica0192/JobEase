<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <h5>{{title}}</h5>
      <hr>
      <div>{{ message }}</div>
      <br>
      <div class="modal-buttons">
        <button class="btn btn-secondary" @click="$emit('close-modal')">Cancel</button>
        <button class="btn btn-primary" @click="confirm">{{ confirmBtnLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    confirmBtnLabel: String,
    message: String,
    onConfirm: Function,
  },
  methods: {
    confirm() {
      if (this.onConfirm) {
        this.onConfirm();
      }
      this.$emit('close-modal');
    },
  },
};
</script>

<style scoped>
/* Modal */
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center; /* horizontally center the modal */
  align-items: center; /* vertically center the modal */
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
  padding: 20px;
  background-color: white;
  height: auto; /* updated property */
  z-index: 10;
  opacity: 1;
}
</style>




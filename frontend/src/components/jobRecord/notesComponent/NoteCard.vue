<template>
  <div class="note-card">
    <div v-if="editable">
      <input v-model="editedTitle" class="title-input" placeholder="Title" />
      <select id="type" v-model="editedType" class="form-control">
        <option v-for="type in typeOptions" :key="type.id" :value="type.name">{{ type.name }}</option>
      </select>
      <textarea v-model="editedContent" placeholder="Type your note here..."></textarea>
      <button class="save-button" @click="saveNote">Save</button>
    </div>
    <div v-else>
      <h2 @dblclick="editable = true">{{ title }}</h2>
      <h5 @dblclick="editable = true">{{ type }}</h5>
      <p>{{ content }}</p>
      <div class="button-container">
        <button class="edit-button" @click="editable = true"><i class="fas fa-edit"></i></button>
        <button class="delete-button" @click="$emit('delete-note')"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editable: false,
      editedTitle: this.title,
      editedType: this.type,
      editedContent: this.content,
      typeOptions: [
        {id: 1, name: "default"},
        {id: 2, name: "pre-interviewed"},
        {id: 3, name: "post-interviewed"},
      ]
    };
  },
  methods: {
    saveNote() {
      this.$emit('update-note', {
        title: this.editedTitle,
        type: this.editedType,
        content: this.editedContent
      });
      this.editable = false;
    }
  }
};
</script>

<style scoped>
p {
  flex-grow: 1;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 3px;
  color: #444;
}

h5 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: dimgrey;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.edit-button, .delete-button {
  border: none;
  background-color: transparent;
  margin-left: 10px;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.edit-button:hover,
.delete-button:hover {
  background: transparent;
  color: #444;
}

.title-input, select {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ddd;
  background-color: #f5f5f5;
  color: #444;
}

textarea {
  display: block;
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 2px solid #ddd;
  background-color: #f5f5f5;
  color: #444;
  resize: none;
}

.save-button {
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  margin: 10px;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.save-button:hover {
  background-color: #2e7d32;
}
</style>

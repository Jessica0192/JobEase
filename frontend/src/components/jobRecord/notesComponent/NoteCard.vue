<template>
  <div class="note-card">
    <div v-if="editable">
      <form @submit.prevent="saveNote">
        <input v-model="editedTitle" class="title-input" placeholder="Title" required/>
        <select id="type" v-model="editedType" class="form-control" required>
          <option v-for="type in note_type_options" :key="type.id" :value="type">{{ type.note_type_name }}</option>
        </select>
        <textarea v-model="editedContent" placeholder="Type your note here..." required></textarea>
        <button type="submit" class="save-button">Save</button>
      </form>
    </div>
    <div v-else>
      <h2 @dblclick="editable = true">{{ title }}</h2>
      <h5 @dblclick="editable = true">{{ job_note_type.note_type_name }}</h5>
      <p>{{ note_content }}</p>
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
    note_type_options: {
      type: Array,
      required: true,
      validator: (options) => {
        return options.every((option) => {
          return typeof option === 'object';
        });
      }
    },
    job_note_type: {
      type: Object,
      required: true
    },
    note_content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editable: false,
      editedTitle: this.title,
      editedType: this.job_note_type,
      editedContent: this.note_content,
    };
  },
  methods: {
    saveNote() {
      this.$emit('update-note', {
        title: this.editedTitle,
        job_note_type: this.editedType,
        note_content: this.editedContent
      });
      this.editable = false;
    }
  }
};
</script>

<style scoped>
p {
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 3px;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}

h5 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: dimgrey;
}

.note-card {
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  min-width: 350px;
  max-width: 365px;
  max-height: 300px;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  overflow-x: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.edit-button,
.delete-button {
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

.title-input,
select {
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


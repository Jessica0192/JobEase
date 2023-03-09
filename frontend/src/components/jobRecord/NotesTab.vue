<template>
  <div class="note-container">
    <div class="note-form-container">
      <note-form @create-note="addNote"></note-form>
    </div>
    <div>
      <div v-if="notes.length === 0" class="empty-state">
        <i class="fas fa-sticky-note"></i>
        <p>No notes yet. Start creating!</p>
      </div>
      <div class="note-list-container">
        <note-card v-for="(note, index) in notes"
                   :key="index"
                   :title="note.title"
                   :type="note.type"
                   :content="note.content"
                   @update-note="updateNote(index, $event)"
                   @delete-note="deleteNote(index)"></note-card>
      </div>
    </div>
  </div>
</template>


<script>
import NoteForm from './notesComponent/NoteForm.vue'
import NoteCard from './notesComponent/NoteCard.vue'

export default {
  components: {
    NoteForm,
    NoteCard
  },
  data() {
    return {
      notes: []
    }
  },
  methods: {
    addNote: function(note) {
      note.editing = false;
      this.notes.push(note);
    },
    updateNote: function(index, updated) {
      this.notes[index].title = updated.title;
      this.notes[index].type = updated.type;
      this.notes[index].content = updated.content;
      this.notes[index].editing = false;
    },
    deleteNote: function(index) {
      this.notes.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.note-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin-bottom: 20px;
}

.empty-state i {
  font-size: 40px;
  margin-bottom: 10px;
  color: #aaa;
}

.note-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}

.note-card {
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  width: 350px;
  max-width: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
}
</style>

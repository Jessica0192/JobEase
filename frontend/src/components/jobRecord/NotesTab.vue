<template>
  <div class="note-container">
    <div class="note-form-container">
      <note-form :note_type_options="noteTypeOptions"
                @create-note="addNote"></note-form>
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
                   :note_type_options="noteTypeOptions"
                   :job_note_type="note.job_note_type"
                   :note_content="note.note_content"
                   @update-note="updateNote(index, $event)"
                   @delete-note="deleteNote(index)"></note-card>
      </div>
    </div>
  </div>
</template>


<script>
import NoteForm from './notesComponent/NoteForm.vue'
import NoteCard from './notesComponent/NoteCard.vue'
import {jobNoteTypeApi} from '@/services/JobNoteTypeApi'

export default {
  components: {
    NoteForm,
    NoteCard
  },
  data() {
    return {
      notes: [],
      noteTypeOptions:[]
    }
  },
  async mounted () {
    await jobNoteTypeApi.getAllJobNoteTypes().then(response => {
      if (response && response.status === 200) {
        this.noteTypeOptions = response.data;
      }
    });
  },
  methods: {
    addNote: function(note) {
      note.editing = false;
      this.notes.push(note);
    },
    updateNote: function(index, updated) {
      this.notes[index].title = updated.title;
      this.notes[index].job_note_type = updated.job_note_type;
      this.notes[index].note_content = updated.note_content;
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
</style>

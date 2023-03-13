<template>
  <form @submit.prevent="createNote">
    <div class="form-group row">
      <div class="col-sm-2">
        <label for="title" style="margin-top: 5px">Title:</label>
      </div>
      <div class="col-sm-5">
        <input id="title" v-model="title" type="text" class="form-control" required>
      </div>
      <div class="col-sm-2">
        <label for="type" style="margin-top: 5px">Type:</label>
      </div>
      <div class="col-sm-3">
        <select id="type" v-model="job_note_type" class="form-control" required>
          <option v-for="type in note_type_options" :key="type.id" :value="type">{{ type.note_type_name }}</option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-2">
        <label for="content">Content:</label>
      </div>
      <div class="col-sm-10">
        <textarea id="content" v-model="note_content" rows="5" class="form-control" required></textarea>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Create Note</button>
  </form>
</template>

<script>
export default {
  props: {
    note_type_options: {
      type: Array,
      required: true,
      validator: (options) => {
        return options.every((option) => {
          return typeof option === 'object';
        });
      }
    },
  },
  data () {
    return {
      title: '',
      job_note_type: '',
      note_content: ''
    }
  },
  methods: {
    createNote () {
      const note = {
        title: this.title,
        job_note_type: this.job_note_type,
        note_content: this.note_content
      }
      this.$emit('create-note', note)
      this.title = ''
      this.note_content = ''
    }
  }
}
</script>
<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 530;
  margin-bottom: 5px;
}

input[type="text"], textarea, select.form-control {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

input[type="text"], select.form-control {
  height: 45px;
}

textarea {
  display: block;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
}

button[type="submit"]:hover {
  background-color: #45a049;
}
</style>

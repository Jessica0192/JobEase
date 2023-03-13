<template>
   <div class="selected-badges">
      <a aria-placeholder="Selected Tags" v-for="(selectedTag, index) in selectedTags" :key="index" href="#" class="badge padded-badge" :class="selectedTag.class" @click="removeTag(selectedTag)">{{ selectedTag.tag_name }}</a>
    </div>
    <p style="color: darkred">{{ jobTagMessage }}</p>
    <br/>
    <div class="badge-list">
      <a v-for="(tag, index) in tempTags" :key="index" href="#" class="badge padded-badge" :class="tag.class" @click="selectTag(tag)">{{ tag.tag_name }}</a>
    </div>
</template>

<script>
import {jobTagApi} from '@/services/JobTagApi'

export default {
  name: 'TagTab',
  data(){
    return{
      tags: [],   // original tag with tag_name and id
      tempTags: [], // temp tags data with extra property called classes which is for style
      selectedTags: [],
      jobTagMessage: '* Please click on tag to add or remove from list'
    }
  },
  created() {
    const tagStyleClasses = ['badge-success big-badge',
                  'badge-danger big-badge',
                  'badge-warning big-badge',
                  'badge-info big-badge',
                  'badge-light big-badge',
                  'badge-dark big-badge'];
    // Make API call to get the tag data
    jobTagApi.getAllTags().then(response => {
      if (response && response.status === 200){
        this.tags = response.data
        if (Array.isArray(this.tags)) {
          this.tempTags = this.tags.map((tag, index) => {
            return {...tag, class: tagStyleClasses[index % tagStyleClasses.length]};
          });
        }
      }
    });
  },
  methods: {
    selectTag(tag) {
      this.selectedTags.push(tag);
      this.tempTags = this.tempTags.filter(b => b !== tag);
    },
    removeTag(tag) {
      this.tempTags.push(tag);
      this.selectedTags = this.selectedTags.filter(b => b !== tag);
    }
  },
}
</script>

<style scoped>
.badge-list {
  padding-inline: 70px;
  display: flex;
  justify-content: center; /* Centers the badges horizontally */
  flex-wrap: wrap;
  gap: 10px; /* Adds 10px gap between each badge */
}
.padded-badge {
  padding: 6px 12px; /* Adds 6px padding on top/bottom and 12px padding on left/right */
}
.selected-badges {
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  height: 55px;
  line-height: 50px;
}
.big-badge {
  font-size: 15px;
  padding: 10px 30px;
}
</style>

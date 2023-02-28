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

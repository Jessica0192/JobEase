// this file is included in both createJobRecord.js and jobRecordDetail.js

export default {
  data() {
    return {
      activeItem: 'jobInfo',
    };
  },
  methods: {
   // this is for tab appearance
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    // this is for tab appearance
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    // when
    selectTag(tag) {
      this.selectedTags.push(tag);
      this.tempTags = this.tempTags.filter(b => b !== tag);
    },
    removeTag(tag) {
      this.tempTags.push(tag);
      this.selectedTags = this.selectedTags.filter(b => b !== tag);
    }
  },
};

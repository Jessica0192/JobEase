// this file is included in both createJobRecord.js and jobRecordDetail.js

import { jobTagApi } from '@/services/JobTagApi'
import {jobStatusApi} from '@/services/JobStatusApi'

export default {
  data() {
    return {
      statusOptions: [],  // status data with status_name and id
      tags: [],   // original tag with tag_name and id
      tempTags: [], // temp tags data with extra property called classes which is for style
      selectedTags: [],
      activeItem: 'jobInfo',
    };
  },
  created() {
    jobStatusApi.getAllStatus().then(response => {
      if (response && response.status === 200 && Array.isArray(response.data)) {
        this.statusOptions = response.data
      }
    });

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

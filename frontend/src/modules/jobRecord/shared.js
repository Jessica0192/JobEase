// this file is included in both createJobRecord.js and jobRecordDetail.js

import { jobTagApi } from '@/services/JobTagApi'
import {jobStatusApi} from '@/services/JobStatusApi'

export default {
  data() {
    return {
      statusOptions: [],
      tags: [],
      selectedTags: [],
      activeItem: 'jobInfo',
    };
  },
  created() {
    jobStatusApi.getAllStatus().then(response => {
      if (Array.isArray(response.data)) {
        //this.statusOptions = response.data.map(d => d.status_name);
        this.statusOptions = response.data
        console.log(this.statusOptions)
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
      if (Array.isArray(response.data)) {
        this.tags = response.data.map((tag, index) => {
          return {...tag, class: tagStyleClasses[index % tagStyleClasses.length]};
        });
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
      this.tags = this.tags.filter(b => b !== tag);
    },
    removeTag(tag) {
      this.tags.push(tag);
      this.selectedTags = this.selectedTags.filter(b => b !== tag);
    }
  },
};

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

<script src="../../modules/jobRecord/components/tagTab.js"/>

<style scoped>
.padded-badge {
  padding: 10px 20px;
  margin-right: 10px;
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

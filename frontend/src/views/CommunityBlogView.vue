<template>
  <div>
    <h1 class="view-title">Community Blog</h1>
    <div class="container">
      <div class="header">
        <textarea class="new-post" v-model="newPost" placeholder="Create a new post..."></textarea>
        <button class="post-button" @click="addPost">Post</button>
      </div>
      <div class="posts">
        <div v-for="(post, index) in posts" :key="index" class="post">
          <div class="post-header">
            <div class="post-author">{{ post.user }}</div>
            <div class="post-menu" v-if="isAuthor(post)">
              <button class="ellipsis-button" @click="togglePostMenu(index)">
                <i class="fa fa-ellipsis-h"></i>
              </button>
              <div class="post-options" v-if="showPostMenu === index">
                <button class="post-edit-button" @click="editPost(index)">
                  <i class="fa fa-edit"></i>Edit
                </button>
                <button class="delete-button" @click="deletePost(index)">
                  <i class="fa fa-trash"></i>Delete
                </button>
              </div>
            </div>
          </div>
          <div v-if="!post.editing" class="post-content">{{ post.content }}</div>
          <div v-if="post.editing">
            <textarea class="edit-post" v-model="post.content"></textarea>
            <button class="save-button" @click="saveEditedPost(index)">Save</button>
          </div>
          <div class="comments">
            <div v-for="(comment, commentIndex) in post.comments" :key="commentIndex" class="comment">
              <div class="comment-content">
                <div class="post-author">{{ comment.user }}</div>
                <template v-if="comment.editing">
                  <textarea class="edit-comment" v-model="comment.content"></textarea>
                </template>
                <template v-else>
                  {{ comment.content }}
                </template>
              </div>
              <div class="comment-options" v-if="isAuthor(comment)">
                <template v-if="!comment.editing">
                  <button class="comment-edit-button" @click="editComment(comment)">
                    <i class="fa fa-edit"></i>Edit
                  </button>
                  <button class="delete-button" @click="deleteComment(index, commentIndex, comment)">
                    <i class="fa fa-trash"></i>Delete
                  </button>
                </template>
                <template v-else>
                  <button class="comment-save-button" @click="saveComment(comment)">
                    <i class="fa fa-save"></i>Save
                  </button>
                </template>
              </div>
            </div>
          </div>
          <div class="post-footer">
            <textarea class="new-comment" v-model="newComments[index]" placeholder="Write a comment..."></textarea>
            <button class="comment-button" @click="addComment(index)">Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="@/modules/communityBlog.js"/>

<style scoped src="../assets/css/communityBlog.css"/>

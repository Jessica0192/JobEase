<template>
  <div>
    <h1 class="view-title">Community Blog</h1>
    <div class="py-4 container-fluid">
      <!--     CREATE NEW POST SECTION     -->
      <div class="header">
        <textarea class="new-post" v-model="newPost" placeholder="Create a new post..."></textarea>
        <button class="post-button" @click="addPost">Post</button>
      </div>
      <!--   END   -->
      <div class="posts">
        <div v-for="(post, index) in posts" :key="index" class="post">
          <!--     POST HEADER - USERNAME, POPUPMENU     -->
          <div class="post-header">
            <div class="post-author">{{ post.user }}</div>
            <div class="post-menu" v-if="isAuthor(post)">
              <button class="ellipsis-button" @click="togglePostMenu(index)">
                <i class="fa fa-ellipsis-h"></i>
              </button>
              <div class="post-options" v-if="showPostMenu === index">
                <button class="post-edit-button" @click="toggleEditPost(index)">
                  <i class="fa fa-edit"></i>Edit
                </button>
                <button class="delete-button" @click="deletePost(index)">
                  <i class="fa fa-trash"></i>Delete
                </button>
              </div>
            </div>
          </div>
          <!--     END     -->
          <!--     POST CONTENT     -->
          <div v-if="!post.editing" class="post-content">{{ post.content }}</div>
          <!--     END     -->
          <!--     POST CONTENT EDIT MODE    -->
          <div v-if="post.editing">
            <textarea class="edit-post" v-model="post.content"></textarea>
            <button class="cancel-button" @click="cancelEditingPost(index)">Cancel</button>
            <button class="save-button" @click="saveEditedPost(index)">Save</button>
          </div>
          <!--     END     -->
          <!--    POST COMMENTS      -->
          <div class="comments">
            <div v-for="(comment, commentIndex) in post.comments" :key="commentIndex" class="comment">
              <div class="comment-content">
                <div class="post-author">{{ comment.user }}</div>
                <!--     COMMENT CONTENT EDIT MODE (TEXTAREA)   -->
                <template v-if="comment.editing">
                  <textarea class="edit-comment" v-model="comment.content"></textarea>
                </template>
                <!--     END    -->
                <!--     POST CONTENT     -->
                <template v-else>
                  {{ comment.content }}
                </template>
                <!--     END     -->
              </div>
              <div v-if="isAuthor(comment)">
                <!--     COMMENT POPUP MENU     -->
                <div class="comment-menu">
                  <!--     COMMENT POPUP MENU    -->
                  <template v-if="!comment.editing">
                    <button class="ellipsis-button" @click="toggleCommentMenu(commentIndex)">
                      <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <div class="comment-options" v-if="showCommentMenu === commentIndex">
                      <button class="comment-edit-button" @click="toggleEditComment(comment)">
                        <i class="fa fa-edit"></i>Edit
                      </button>
                      <button class="delete-button" @click="deleteComment(index, commentIndex, comment)">
                        <i class="fa fa-trash"></i>Delete
                      </button>
                    </div>
                  </template>
                  <!--     END    -->
                  <!--     COMMENT EDIT MODE MENU BUTTONS     -->
                  <template v-else>
                      <div style="display: flex; flex-direction: column; align-items: center;">
                        <button class="comment-save-button" @click="cancelEditingComment(comment)">
                          <i class="fa fa-cancel"></i>Cancel
                        </button>
                        <button class="comment-save-button" @click="saveComment(comment)">
                          <i class="fa fa-save"></i>Save
                        </button>
                      </div>
                  </template>
                  <!--     END    -->
                </div>
              </div>
            </div>
          </div>
          <!--     END    -->
          <!--     ADDING NEW COMMENT    -->
          <div class="post-footer">
            <textarea class="new-comment" v-model="newComments[index]" placeholder="Write a comment..."></textarea>
            <button class="comment-button" @click="addComment(index)">Comment</button>
          </div>
          <!--     END    -->
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../modules/communityBlog.js"/>

<style scoped src="../assets/css/communityBlog.css"/>

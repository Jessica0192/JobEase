import {communityBlogApi} from '@/services/CommunityBlogApi'

export default {
  data() {
    return {
      newPost: "",
      newComments: [],
      beforeEditingCache: null,
      showPostMenu: null,
      showCommentMenu: null,
      posts: [],
      currentUserName: JSON.parse(localStorage.getItem('user'))
    };
  },
  computed: {
    isAuthor() {
      return (postOrComment) => {
        return this.currentUserName === postOrComment.user.toString();
      }
    },

  },
  async mounted () {
    // get all posts
    await communityBlogApi.getAllPosts().then(response => {
      if (response && response.status === 200) {
        this.posts = response.data;
        this.posts = this.posts.map(item => {
          return {
            ...item,
            user: item.user.username
          };
        }).reverse();
        // Add an "editing" property to each post
        this.posts.forEach(post => {
          post.editing = false;
        });
      }
    });

    // get all comments for each posts
    await this.posts.forEach(post => {
      communityBlogApi.getAllCommentsForPost(post.id).then(response => {
        if (response && response.status === 200) {
          post.comments = response.data;
          post.comments = post.comments.map(item => {
            return {
              ...item,
              user: item.user.username
            };
          });
        }
      })
    })
  },
  methods: {
    async addComment(index) {
      const newComment = this.newComments[index].trim();
      if (newComment !== '') {
        const data = {
          content: newComment,
          post_id: this.posts[index].id
        }

        // API Call
        await communityBlogApi.createComment(data).then(response => {
          if (response && response.status === 200) {
            // add into UI
            const comment = { content: newComment, user: this.currentUserName ? this.currentUserName : "" };
            this.posts[index].comments.push(comment);
            this.newComments[index] = '';
          }
        });
      }
    },
    toggleCommentMenu(index) {
      if (this.showCommentMenu === index) {
        this.showCommentMenu = null;
      } else {
        this.showCommentMenu = index;
      }
    },
    toggleEditComment(comment) {
      // saving current state of comment before editing
      this.beforeEditingCache = Object.assign({}, comment);
      // show edit box
      comment.editing = true;
      // close comment popup menu
      this.showCommentMenu = null;
    },
    async cancelEditingComment(comment) {
      // return the content back to its previous state
      Object.assign(comment, this.beforeEditingCache);
      comment.editing = false;
    },
    async saveComment(comment) {
      await communityBlogApi.updateComment(comment.id,{content: comment.content}).then(response => {
        if (response && response.status === 200) {
          // cancel selection of edit button
          comment.editing = false;
        }
      });
    },
    async deleteComment(postIndex, commentIndex, comment) {
      await communityBlogApi.deleteComment(comment.id).then(response => {
        if (response && response.status === 200) {
            // update deletion of comment in UI
            this.showPostMenu = null;
            this.posts[postIndex].comments.splice(commentIndex, 1);
        }
      });
    },
    togglePostMenu(index) {
      if (this.showPostMenu === index) {
        this.showPostMenu = null;
      } else {
        this.showPostMenu = index;
      }
    },
    async addPost() {
      if (this.newPost !== "") {
        // API Call
        await communityBlogApi.createPost({content: this.newPost}).then(response => {
          if (response && response.status === 200) {
            // add into UI
            this.posts.unshift({
              user: this.currentUserName ? this.currentUserName : "",
              content: this.newPost,
              comments: [],
              editing: false
            });
            this.newPost = "";
          }
        });
      }
    },
    toggleEditPost(index) {
      // saving current state of comment before editing
      this.beforeEditingCache = Object.assign({}, this.posts[index]);
      // display edit box
      this.posts[index].editing = true;
      // close popup option menu
      this.showPostMenu = null;
    },
    async cancelEditingPost(index) {
      // return the content back to its previous state
      this.posts[index] = this.beforeEditingCache
      // cancel selection of edit button
      this.posts[index].editing = false;
    },
    async saveEditedPost(index) {
      await communityBlogApi.updatePost(this.posts[index].id,{content: this.posts[index].content}).then(response => {
        if (response && response.status === 200) {
          // cancel selection of edit button
          this.posts[index].editing = false;
        }
      });
    },
    async deletePost(index) {
      await communityBlogApi.deletePost(this.posts[index].id).then(response => {
        if (response && response.status === 200) {
            // update deletion of post in UI
            this.showPostMenu = null;
            this.posts.splice(index, 1);
        }
      });
    }
  }
};

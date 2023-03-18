import {communityBlogApi} from '@/services/CommunityBlogApi'

export default {
  data() {
    return {
      newPost: "",
      newComments: [],
      showPostMenu: null,
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
    editComment(comment) {
      comment.editing = true;
    },
    saveComment(comment) {
      comment.editing = false;
      // Call Update Comment API ENDPOINT
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
      // TODO: toggle post menu when the post is created by 'CURRENT USER'
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
    editPost(index) {
      this.posts[index].editing = true;
      this.showPostMenu = null;
    },
    saveEditedPost(index) {
      // TODO: Call Update POST API ENDPOINT
      this.posts[index].editing = false;
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

export default {
  data() {
    return {
      newPost: "",
      newComments: [],
      showPostMenu: null,
      posts: [
        {
          author: "You",
          content: "Hello, world!",
          comments: [],
          editing: false
        }
      ],
      currentUserId: JSON.parse(localStorage.getItem('user'))
    };
  },
  computed: {
    isAuthor() {
      return (postOrComment) => {
        return this.currentUserId === postOrComment.author.toString();
      }
    },

  },
  methods: {
    addPost() {
      if (this.newPost !== "") {
        this.posts.unshift({
          author: this.currentUserId ? this.currentUserId : "",
          content: this.newPost,
          comments: [],
          editing: false
        });
        this.newPost = "";
      }
    },
    addComment(index) {
      const newComment = this.newComments[index].trim();
      if (newComment !== '') {
        const comment = { content: newComment, author: this.currentUserId ? this.currentUserId : "" };
        this.posts[index].comments.push(comment);
        this.newComments[index] = '';
      }
    },
    editComment(comment) {
      comment.editing = true;
    },
    saveComment(comment) {
      comment.editing = false;
    },
    cancelEditComment(comment) {
      comment.editing = false;
    },
    togglePostMenu(index) {
      // TODO: toggle post menu when the post is created by 'CURRENT USER'
      if (this.showPostMenu === index) {
        this.showPostMenu = null;
      } else {
        this.showPostMenu = index;
      }
    },
    editPost(index) {
      this.posts[index].editing = true;
      this.showPostMenu = null;
    },
    saveEditedPost(index) {
      this.posts[index].editing = false;
    },
    deletePost(index) {
      this.showPostMenu = null;
      this.posts.splice(index, 1);
    }
  }
};

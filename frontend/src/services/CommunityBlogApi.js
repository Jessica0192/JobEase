// this file contains api calls for Community Blog UI

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Job Record
export const communityBlogApi = {
  // Post
  getPostById (postId) {
    return service.get(`${API.post('')}${postId}`)
  },
  getAllPostsForUser () {
    return service.get(`${API.post('')}`)
  },
  getAllPosts () {
    return service.get(`${API.post('')}all-posts/`)
  },
  createPost (data) {
    return service.post(`${API.post('')}`, data)
  },
  deletePost (postId) {
    return service.delete(`${API.post('')}${postId}`)
  },

  // Comment
  getAllCommentsForPost (postId) {
    return service.get(`${API.comment('')}${postId}`)
  },
  getAllCommentsUserMade () {
    return service.get(`${API.comment('')}`)
  },
  createComment (data) {
    return service.post(`${API.comment('')}`, data)
  },
  deleteComment (commentId) {
    return service.delete(`${API.comment('')}${commentId}`)
  },
}

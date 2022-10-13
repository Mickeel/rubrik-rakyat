import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    nextToken: "",
    activeNextToken: "",
  }),
  getters: {
    allPosts(state) {
      return state.posts;
    },
  },
  actions: {
    addPost(text) {
      this.posts.push(text);
    },
    setNextToken(value) {
      this.nextToken = value;
    },
    setActiveNextToken(value) {
      this.activeNextToken = value;
    },
  },
});

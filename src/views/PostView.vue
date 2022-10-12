<template>
  <div class="text-center pt-16 md:pt-20">
    <p v-if="post.dateTo" class="text-sm md:text-base text-green-500 font-bold">
      {{ dateTime(post.dateTo) }} <span class="text-gray-900">/</span>
      {{ post.leaderName }}
    </p>
    <h1 class="font-bold break-normal text-3xl md:text-5xl">
      {{ post.title }}
    </h1>
  </div>
  <div
    class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
    style="
      background-image: url('https://placeimg.com/400/320/people');
      height: 75vh;
    "
  ></div>
  <div class="container max-w-5xl mx-auto -mt-32">
    <div class="mx-0 sm:mx-6">
      <div
        class="bg-white w-full p-8 md:p-24 text-lg md:text-xl text-gray-800 leading-normal"
        style="font-family: Georgia, serif"
      >
        <div class="content" v-html="post.content"></div>
      </div>

      <div
        class="flex w-full items-center font-sans px-8 pb-8 md:px-24 md:pb-24"
      >
        <img
          class="w-10 h-10 rounded-full mr-4"
          :src="getAvatar(post.leaderPicUrl, post.leaderName)"
          alt="{{ post.leaderName }}"
        />
        <div class="flex-1">
          <p class="text-base font-bold text-base md:text-xl leading-none">
            {{ post.leaderName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      post: [],
      author: "",
      apiUrl: import.meta.env.VITE_GRAPHQL_API_URL,
      apiKey: import.meta.env.VITE_GRAPHQL_API_KEY,
    };
  },

  mounted() {
    this.getPost(this.$route.params.id);
  },

  methods: {
    getPost(id) {
      const body = {
        query: `
          query getPost {
            getPost(id: "${id}") {
              id
              leaderID
              owner
              content
              category
              dateTo
              title
              status
              path
            }
          }
        `,
        variables: {},
      };
      const options = {
        headers: {
          "x-api-key": this.apiKey,
        },
      };
      axios.post(this.apiUrl, body, options).then((response) => {
        this.post = response.data.data.getPost;
        this.post.leaderName = "-";
        this.getLeader(this.post.leaderID);
      });
    },
    getLeader(id) {
      const body = {
        query: `
          query getLeader {
            getLeader(id: "${id}") {
              id
              name
              path
              picUrl
            }
          }
        `,
        variables: {},
      };
      const options = {
        headers: {
          "x-api-key": this.apiKey,
        },
      };
      axios.post(this.apiUrl, body, options).then((response) => {
        this.post.leaderName = response.data.data.getLeader.name;
        this.post.leaderPicUrl = response.data.data.getLeader.picUrl;
      });
    },
    dateTime(value) {
      if (value) return moment(value).format("D MMMM YYYY");
    },
    getAvatar(url, name) {
      if (url == null) {
        return `http://i.pravatar.cc/300?index=${name}`;
      }
      return url;
    },
  },
};
</script>

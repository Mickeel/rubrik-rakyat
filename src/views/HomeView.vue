<template>
  <main class="container px-4 md:px-0 max-w-6xl mx-auto">
    <div class="flex flex-wrap justify-between pt-12 -mx-6">
      <div
        v-for="(post, index) in postStore.posts"
        :key="index"
        class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
      >
        <div
          class="flex-1 flex-row bg-white rounded-t rounded-b-none overflow-hidden shadow-lg"
        >
          <RouterLink
            :to="`/p/${post.id}`"
            class="flex flex-wrap no-underline hover:no-underline"
          >
            <img
              :src="`https://placeimg.com/400/320/people?index=${index}`"
              class="h-full w-full rounded-t pb-6"
            />
            <div class="w-full font-bold text-xl text-gray-900 px-6">
              {{ post.title }}
            </div>
            <p
              class="text-gray-800 font-serif text-base px-6 mb-5 line-clamp-2"
            >
              {{ post.content }}
            </p>
          </RouterLink>
        </div>
        <div
          class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6"
        >
          <div class="flex items-center justify-between">
            <img
              class="w-8 h-8 rounded-full mr-4 avatar"
              data-tippy-content="{{ post.leaderName }}"
              :src="getAvatar(post.leaderPicUrl, post.leaderName)"
              alt="{{ post.leaderName }}"
              tabindex="0"
            />
            <p class="w-full text-gray-600 text-xs md:text-sm">
              {{ post.leaderName }}
            </p>
            <p class="w-2/5 text-right text-gray-600 text-xs md:text-sm">
              {{ dateTime(post.date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <paginator :nextToken="postStore.nextToken" @load-more="loadMore" />
  </main>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Paginator from "@/components/PaginatorBar.vue";
import { mapStores } from "pinia";
import { usePostStore } from "@/stores/post";

export default {
  computed: {
    ...mapStores(usePostStore),
  },
  components: {
    Paginator,
  },
  data() {
    return {
      leaders: [],
      leadersQuery: "",
      apiUrl: import.meta.env.VITE_GRAPHQL_API_URL,
      apiKey: import.meta.env.VITE_GRAPHQL_API_KEY,
    };
  },

  mounted() {
    if (!this.postStore.posts.length) this.getPosts();
  },

  methods: {
    getPosts() {
      const tokenQuery = this.postStore.activeNextToken
        ? `nextToken: "` + this.postStore.activeNextToken + `"`
        : "";
      const body = {
        query: `
          query postByCategory {
            postByCategory(
              category: POST
              limit: 9
              ${tokenQuery}
            ) {
              items {
                id
                title
                dateTo
                leaderID
                status
                category
                content
              }
              nextToken
              startedAt
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
        const res = response.data.data;
        this.postStore.setNextToken(res.postByCategory.nextToken);
        res.postByCategory.items.forEach((item) => {
          this.postStore.addPost({
            id: item.id,
            leaderID: item.leaderID,
            leaderName: "-",
            leaderPicUrl: null,
            title: item.title,
            content: item.content.substring(0, 100),
            date: item.dateTo,
          });
        });
        this.getLeaders();
      });
    },
    getLeaders() {
      this.leadersQuery = "query getLeaders {";
      this.postStore.posts.forEach((item, index) => {
        this.leadersQuery += `
          leader${index}: getLeader(id: "${item.leaderID}") {
            id
            name
            path
            picUrl
          }
        `;
      });
      this.leadersQuery += "}";

      const body = {
        query: this.leadersQuery,
        variables: {},
      };
      const options = {
        headers: {
          "x-api-key": this.apiKey,
        },
      };
      axios.post(this.apiUrl, body, options).then((response) => {
        const res = response.data.data;
        this.postStore.posts.forEach((post, index) => {
          const data = res[`leader${index}`];
          post.leaderName = data.name;
        });
      });
    },
    loadMore(n) {
      this.postStore.setActiveNextToken(n);
      this.getPosts();
    },
    dateTime(value) {
      return moment(value).format("D MMM YY");
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

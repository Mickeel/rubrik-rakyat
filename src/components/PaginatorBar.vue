<template>
  <div class="flex items-center justify-between px-4 pt-3 pb-12 sm:px-6">
    <div class="flex flex-1 justify-center sm:hidden">
      <a
        @click="$emit('loadMore', nextToken)"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span>Load more</span>
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
      <div></div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Load More"
        >
          <a
            @click="$emit('loadMore', nextToken)"
            class="relative inline-flex items-center rounded-md cursor-pointer border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span>Load more</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginatorBar",

  props: {
    nextToken: String,
  },
  emits: ["loadMore"],

  mounted() {},

  methods: {
    nextPage() {
      return {
        nextTokenSet: this.nextToken,
      };
    },
  },
};
</script>

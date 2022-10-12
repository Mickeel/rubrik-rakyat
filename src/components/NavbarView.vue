<template>
  <nav class="sticky top-0 bg-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="toggleMobileMenu()"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              v-if="!showMobileMenu"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              v-else
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <RouterLink to="/">
              <img
                class="block h-8 w-auto lg:hidden"
                src="@/assets/logo.svg"
                alt="Rubrik Rakyat"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="@/assets/logo.svg"
                alt="Rubrik Rakyat"
              />
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/"
              >
                Home
              </RouterLink>
              <RouterLink
                class="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/about"
              >
                Tentang Kami
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden" id="mobile-menu" v-show="showMobileMenu">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <RouterLink
          class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          to="/"
        >
          Home
        </RouterLink>
        <RouterLink
          class="text-gray-600 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          to="/about"
        >
          About
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/NavbarView.vue";
</script>

<style scoped></style>

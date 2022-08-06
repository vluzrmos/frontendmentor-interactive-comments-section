<script setup>
import CommentsList from "./components/CommentsList.vue";
import { useCommentsStore } from "./stores/comments.js";

const commentsStore = useCommentsStore();
</script>

<template>
  <main>
    <CommentsList :comments="commentsStore.comments"></CommentsList>
  </main>
</template>



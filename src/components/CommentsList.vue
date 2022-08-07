<script setup>
import Comment from "./Comment.vue";
import CommentForm from "./CommentForm.vue";

defineProps({ comments: { type: Array } });
</script>

<template>
  <div class="comments">
    <template v-for="comment in comments" :key="comment.id">
      <Comment :comment="comment" />

      <div v-if="comment.replies.length" class="comment__replies">
        <Comment v-for="reply in comment.replies" :key="reply.id" :comment="reply" :parent-comment="comment"/>
      </div>
    </template>
  </div>
  <div class="comments">
    <CommentForm />
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import { useCommentsStore } from "../stores/comments";
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  comment: { type: Object },
  parentComment: { type: Object },
  autoFocus: { type: Boolean },
});

const emits = defineEmits(["submit"]);

const user = useUserStore();

const content = ref("");

const setContentInitial = () => {
  content.value = "";
};

const replyingTo = computed(() => {
  if (props.comment?.user.username === user.username) {
    return null;
  }

  return props.comment?.replyingTo || null;
});

const onSubmit = () => {
  comments.add(
    {
      content: content.value,
      createdAt: "a few seconds ago",
      score: 0,
      user: user,
      replyingTo: replyingTo?.value,
      replies: [],
    },
    props.parentComment
  );

  setContentInitial();

  emits("submit");
};

const comments = useCommentsStore();

const reply = computed(() => props.comment || props.parentComment);

const contentInput = ref(null);

onMounted(() => {
  if (props.autoFocus) {
    contentInput.value.focus()
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="comment comment--form">
    <div class="comment__avatar">
      <img :src="user.image.png" :alt="`${user.username} avatar's`" />
    </div>
    <textarea ref="contentInput" placeholder="Add a comment..." required v-model="content"></textarea>
    <div class="comment__submit">
      <button type="submit" class="button button--primary" :disabled="content.length === 0">
        <span v-if="reply">REPLY</span>
        <span v-else>SEND</span>
      </button>
    </div>
  </form>
</template>
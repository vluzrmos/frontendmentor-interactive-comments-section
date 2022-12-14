<script setup>
import { computed } from "@vue/runtime-core";
import { useUserStore } from "../stores/user";
import IconPlus from "./icons/IconPlus.vue";
import IconMinus from "./icons/IconMinus.vue";
import IconReply from "./icons/IconReply.vue";
import IconDelete from "./icons/IconDelete.vue";
import CommentForm from "./CommentForm.vue";

import { useCommentsStore } from "../stores/comments";

const props = defineProps({
  comment: { type: Object, required: true },
  parentComment: { type: Object },
});

const comments = useCommentsStore();
const comment = computed(() => props.comment);
const currentUser = useUserStore();

const authorIsCurrentUser = computed(
  () => comment.value.user.username === currentUser.username
);

const username = computed(() => comment.value.user.username);
const avatar = computed(() => comment.value.user.image.png);

const date = computed(() => comment.value.createdAt);
const body = computed(() => comment.value.content);

const score = computed(() => comment.value.score);
const replyingTo = computed(() => comment.value.replyingTo || null);

const [showReplyForm, toggleReplyForm] = useToggle(false);

const onUpVote = () => console.log("voting up...");
const onDownVote = () => console.log("voting down...");
const onDelete = () => comments.delete(comment.value);
const onReply = () => toggleReplyForm();
</script>

<template>
  <div class="comment">
    <div class="comment__votes">
      <div class="comment__up_down_vote">
        <button class="comment__vote_plus" @click.prevent="onUpVote">
          <IconPlus />
        </button>
        <div class="comment__score" :title="`Total score ${score}`">
          <span>{{score > 99 ? 99: score}}</span>
          <sup v-if="score > 99">+</sup>
        </div>
        <button class="comment__vote_minus" @click.prevent="onDownVote">
          <IconMinus />
        </button>
      </div>
    </div>
    <div class="comment__content">
      <div class="comment__header">
        <div class="comment__avatar">
          <img :src="avatar" alt />
        </div>
        <div class="comment__author">{{ username }}</div>
        <div class="comment__author_self" v-if="authorIsCurrentUser">you</div>
        <div class="comment__date">{{ date }}</div>
        <div class="comment__actions">
          <button
            v-if="authorIsCurrentUser"
            class="comment__action--delete"
            @click.prevent="onDelete"
          >
            <IconDelete />
            <span>Delete</span>
          </button>
          <button class="comment__action--reply" @click.prevent="onReply">
            <IconReply />
            <span>Reply</span>
          </button>
        </div>
      </div>
      <div class="comment__body">
        <a href="#" v-if="replyingTo" class="replingto">@{{replyingTo}}</a>
        {{ body }}
      </div>
    </div>
  </div>

  <CommentForm
    :comment="comment"
    :parent-comment="parentComment || comment"
    auto-focus
    v-if="showReplyForm"
    @submit="toggleReplyForm()"
  />
</template>
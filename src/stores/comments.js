import { maxBy, pick, findIndex } from "lodash";
import { defineStore } from "pinia";
import data from "./../../data.json";

export const useCommentsStore = defineStore("comments", {
  state() {
    return {
      // comments: useLocalStorage("comments", data?.comments || [], {
      //   mergeDefaults: true,
      // }),
      comments: data?.comments || [],
    };
  },
  getters: {
    flatten() {
      const comments = [];

      this.comments.forEach((comment) => {
        comments.push(pick(comment, ["id"]));

        comment?.replies.forEach((reply) => {
          comments.push({ ...pick(reply, ["id"]), replyingToId: comment.id });
        });
      });

      return comments;
    },

    lastId() {
      return maxBy(this.flatten, "id")?.id || 0;
    },
  },
  actions: {
    add(comment, parentComment) {
      comment.id = this.lastId + 1;

      if (!parentComment) {
        this.comments.push(comment);
        return;
      }

      const index = findIndex(this.comments, { id: parentComment.id });

      if (index === -1) {
        this.comments.push(comment);
        return;
      }

      this.comments[index].replies.push(comment);
    },

    delete(comment) {
      const index = findIndex(this.comments, { id: comment.id });

      if (index >= 0) {
        return this.comments.splice(index, 1);
      }

      let replaceCommentIndex = null;
      let removeReplyIndex = null;

      for (let i in this.comments) {
        const c = this.comments[i];

        for (let j in c.replies) {
          const r = c.replies[j];

          if (r.id === comment.id) {
            replaceCommentIndex = i;
            removeReplyIndex = j;
            break;
          }
        }

        if (removeReplyIndex !== null) {
          break;
        }
      }

      if (removeReplyIndex !== null) {
        const c = this.comments[replaceCommentIndex];
        const r = c.replies.splice(removeReplyIndex, 1);

        this.comments.splice(replaceCommentIndex, 1, c);

        return r;
      }
    },
  },
});

import { defineStore } from "pinia";
import data from "./../../data.json";

export const useCommentsStore = defineStore("comments", {
  state() {
    return {
      comments: useLocalStorage("comments", data?.comments || [], {
        mergeDefaults: true,
      }),
    };
  },
});

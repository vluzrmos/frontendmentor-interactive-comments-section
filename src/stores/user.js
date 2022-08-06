import { defineStore } from "pinia";

import data from './../../data.json';

export const useUserStore = defineStore("user", {
  state() {
    return {
      ...(data?.currentUser || {})
    };
  },

  getters: {
    defaultImage: (state) => state.image.png || state.image.webp || null,
  }
});

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bookmarks: JSON.parse(localStorage.getItem('books')) || [
      {
        id: 0, name: 'Yandex', url: 'https://ya.ru/',
      },
      {
        id: 1, name: 'Notion', url: 'https://www.notion.so/',
      },
      {
        id: 2, name: 'Youtube', url: 'https://www.youtube.com/',
      },
    ],
    currentBookmark: null,
    isOpenFormPopup: false,
    searchWord: null,
    filteredBookmarks: null,
  },
  mutations: {
    ADD_BOOKMARK(state, payload) {
      state.bookmarks.push(payload);
      state.searchWord = null;
      localStorage.setItem('books', JSON.stringify(state.bookmarks));
      if (state.filteredBookmarks !== null) {
        state.filteredBookmarks.push(payload);
      }
    },
    REMOVE_BOOKMARK(state, payload) {
      if (Array.isArray(state.filteredBookmarks) || state.filteredBookmarks !== null) {
        const idFromBookmarks = state.bookmarks.findIndex(el => el.url === payload.url);
        const idFromfiltered = state.filteredBookmarks.findIndex(el => el.url === payload.url);
        state.filteredBookmarks.splice(idFromfiltered, 1);
        state.bookmarks.splice(idFromBookmarks, 1);
        if (state.filteredBookmarks.length === 0) {
          state.filteredBookmarks = null;
        }
        localStorage.setItem('books', JSON.stringify(state.bookmarks));
        return;
      }
      const idFromBookmarks = state.bookmarks.findIndex(el => el.url === payload.url);
      state.bookmarks.splice(idFromBookmarks, 1);
      localStorage.setItem('books', JSON.stringify(state.bookmarks));
    },
    OPEN_FORM_POPUP(state, payload) {
      const currentIdx = state.bookmarks.findIndex(el => el.url === payload);
      state.currentBookmark = currentIdx;
      state.isOpenFormPopup = true;
    },
    CLOSE_FORM_POPUP(state) {
      state.isOpenFormPopup = false;
    },
    SAVE_BOOKMARK(state, payload) {
      state.bookmarks[state.currentBookmark].name = payload.name;
      state.bookmarks[state.currentBookmark].url = payload.url;
    },
    FILTERED_BOOKMARK(state, word) {
      if (!word || word === '{}') {
        state.searchWord = null;
        state.filteredBookmarks = null;
      }
      state.searchWord = word;
      state.filteredBookmarks = state.bookmarks.filter(bookmark =>
        bookmark.name.toLowerCase().includes(word.toLowerCase())
        || bookmark.url.toLowerCase().includes(word.toLowerCase()));
    },
  },
  getters: {
    getBookmarks: state => state.bookmarks,
    getSearchWord: state => state.searchWord,
    getFilteredBookmark: state => state.filteredBookmarks,
  },
  actions: {
    FILTERED_BOOKMARK({ commit }, word) {
      commit('FILTERED_BOOKMARK', word);
    },
  },
});

export default store;

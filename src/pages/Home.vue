<template>
  <div class="main">
    <p v-if="!getBookmarks.length && getSearchWord === null" class="main__empty-list">
      Список закладок пуст!
    </p>
    <p v-else-if="(getFilteredBookmark === null || getFilteredBookmark.length === 0)
      && getSearchWord !== null"
      class="main__empty-list">
      Ничего не найдено!
    </p>
    <ul v-else-if="getBookmarks.length" class="main__list">
      <li class="main__list-item" v-for="(bookmark) in filteredBookmarks" :key="bookmark.id">
        <a class="main__list-link" :href="bookmark.url" target="_blank">{{bookmark.name}}
          <span class="main__list-link-url">{{bookmark.url}}</span>
        </a>
        <div class="main__list-dropdown">
           <v-select
              :options="options"
              value="bookmark.name"
              :clearable="false"
              @input="(value) => handler(bookmark, value)"
              label="Standard"
              prepend-icon="edit"
            >
              <template v-slot:prepend>
                <v-icon color="green">edit</v-icon>
              </template>
            </v-select>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      dropdownVisible: false,
      options: ['Удалить', 'Редактировать'],
    };
  },
  computed: {
    ...mapGetters(['getBookmarks', 'getFilteredBookmark', 'getSearchWord']),
    filteredBookmarks() {
      return this.getFilteredBookmark || this.getBookmarks;
    },
  },
  methods: {
    ...mapMutations(['REMOVE_BOOKMARK', 'OPEN_FORM_POPUP']),
    handler(bookmark, value) {
      if (value === 'Удалить') {
        this.REMOVE_BOOKMARK(bookmark);
        this.$notify({
          group: 'notification',
          title: 'Закладка удалена',
        });
      } else if (value === 'Редактировать') {
        this.OPEN_FORM_POPUP(bookmark.url);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  padding: 24px 17px;
}
.main__list {
  display: flex;
  flex-direction: column-reverse;
  max-width: 980px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 8px 0px;
  box-shadow: 0 0 4px rgba(0,0,0,.5);
}
.main__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 40px;
  transition: background-color ease .3s;
}
.main__list-item:hover {
  background-color: #e8f0fe;
}
.main__list-dropdown {
  display: flex;
  position: relative;
}
.main__list-dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color ease .3s;
}
.main__list-dropdown-btn:hover {
  background-color: rgb(212, 212, 212);
}
.main__list-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.main__list-link-url {
  opacity: 0;
  margin-left: 20px;
  transition: opacity ease .3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main__list-link:hover .main__list-link-url {
  opacity: 1;
}
.main__empty-list {
  text-align: center;
  color: rgb(197, 8, 8);
  font-size: 20px;
}
</style>

<template>
  <header class="header">
    <router-link to="/">
      <h1 class="header__title">
        Закладки
      </h1>
    </router-link>
    <div class="header__search">
      <input
        v-model="searchWord"
        class="header__search-input"
        type="text"
        placeholder="Искать в закладках"
      >
    </div>
    <router-link to="/add-bookmark" class="header__add-bookmark">
      <span class="header__add">Добавить</span>
      <SvgSprite
       class="header__add-icon"
        nameIcon="Plus"
        :viewBox="{x: 24, y: 24}"
        :height="20"
        :width="20"
      ></SvgSprite>
    </router-link>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SvgSprite from './SvgSprite';

export default {
  components: { SvgSprite },
  name: 'Header',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    ...mapActions(['FILTERED_BOOKMARK']),
  },
  computed: {
    ...mapGetters(['getSearchWord']),
    searchWord: {
      get() {
        return this.getSearchWord;
      },
      set(value) {
        this.FILTERED_BOOKMARK(value);
      },
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3367d6;
  height: 56px;
  padding: 0 18px 0 18px;
}
.header__title {
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.4px;
  font-weight: 400;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color ease .3s;
}
.header__title:hover {
  background-color: #4274de;
}
.header__add-bookmark {
  border-radius: 4px;
  padding: 10px 15px;
  color: #fff;
  transition: background-color ease .3s;
}
.header__add-bookmark:hover {
  background-color: #4274de;
}
.header__search {
  max-width: 980px;
  width: 100%;
  margin: 0 10px;
}
.header__search-input {
  height: 40px;
  background-color: rgba(0,0,0,.22);
  color: #fff;
  border-radius: 2px;
  padding: 0 10px;
  width: 100%;
}
.header__search-input::placeholder {
  color: #fff;
}
.header__add-icon {
  display: none;
}

@media (max-width: 480px) {
  .header__title {
    padding: 5px 10px;
  }
  .header__add-bookmark {
    padding: 5px;
  }
  .header__add {
    display: none;
  }
  .header__add-icon {
    display: block;
  }
}
</style>

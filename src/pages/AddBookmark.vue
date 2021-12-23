<template>
  <div class="bookmarks">
    <form class="bookmarks__form form" @submit.prevent="submitHandler">
        <div class="bookmarks__field form__field">
          <label class="form__field-name" for="nameEdit">Название</label>
          <input
            class="form__input"
            id="nameEdit"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название закладки</span
          >
        </div>

        <div class="bookmarks__field form__field">
          <label class="form__field-name" for="nameEdit">URL</label>
          <input
            class="form__input"
            id="nameEdit"
            type="text"
            v-model="url"
            :class="{ invalid: $v.url.$dirty && !$v.url.required }"
          />
          <span
            v-if="$v.url.$dirty && !$v.url.required"
            class="invalid"
            >Введите URL</span
          >
          <span
            v-else-if="$v.url.$dirty && !$v.url.url"
            class="invalidUrl"
            >Невалидный URL</span
          >
        </div>

        <div class="form__btn-wrapper">
          <button type="submit" class="form__btn btn">
            Добавить
          </button>
        </div>
      </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, url } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      title: '',
      url: '',
    };
  },
  validations: {
    title: { required },
    url: { required, url },
  },
  methods: {
    ...mapMutations(['ADD_BOOKMARK']),
    submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const newBookmark = {
        name: this.title,
        url: this.url,
        id: Date.now(),
      };
      this.ADD_BOOKMARK(newBookmark);
      this.$notify({
        group: 'notification',
        title: 'Закладка добавлена',
      });
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.bookmarks {
  max-width: 700px;
  margin: 24px auto;
  padding: 10px;
  border-radius: 4px;
}
.bookmarks .form {
  padding: 24px 17px;
  box-shadow: 0 0 4px rgba(0,0,0,.5);
}
</style>

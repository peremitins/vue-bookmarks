<template>
    <div class="form__wrapper" @click.stop="closePopup">
      <form class="form" @click.stop>
        <h5 class="form__title">Изменить закладку</h5>
        <div class="form__field">
          <label for="nameEdit" class="form__field-name">Название</label>
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

        <div class="form__field">
          <label for="nameEdit" class="form__field-name">URL</label>
          <input
            class="form__input"
            id="nameEdit"
            type="text"
            v-model="url"
            :class="{ invalid: $v.url.$dirty && !$v.url.required }"
          />
          <span
            v-if="$v.url.$dirty && !$v.url.required"
            class="helper-text invalid"
            >Введите URL</span
          >
        </div>
        <div class="form__btn-wrapper">
          <button @click.prevent="closePopup" class="form__btn btn">
            Отмена
          </button>
          <button @click.prevent="saveBookmark" class="form__btn btn">
            Сохранить
          </button>
        </div>
      </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      title: this.$store.getters.getBookmarks[this.$store.state.currentBookmark].name,
      url: this.$store.getters.getBookmarks[this.$store.state.currentBookmark].url,
    };
  },
  validations: {
    title: { required },
    url: { required },
  },
  methods: {
    ...mapMutations(['CLOSE_FORM_POPUP', 'SAVE_BOOKMARK']),
    closePopup() {
      this.CLOSE_FORM_POPUP();
    },
    saveBookmark() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.SAVE_BOOKMARK({
        name: this.title, url: this.url,
      });
      this.$notify({
        group: 'notification',
        title: 'Закладка отредактирована',
      });
      this.CLOSE_FORM_POPUP();
    },
  },
};
</script>


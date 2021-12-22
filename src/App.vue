<template>
  <div id="app" >
    <notifications group="notification" position="bottom right"/>
    <FormPopup v-if="$store.state.isOpenFormPopup" ></FormPopup>
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import FormPopup from '@/components/FormPopup';
import Header from '@/components/Header';

export default {
  components: {
    FormPopup, Header },
  name: 'App',
  data() {
    return {

    };
  },

};
</script>

<style>
@import url(./style/reset.css);
</style>

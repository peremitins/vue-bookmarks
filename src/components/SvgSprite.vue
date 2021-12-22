<template>
  <svg v-if="nameIcon === 'Plus'"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    :height="height"
    :width="width"
    :viewBox="`0 0 ${viewBox.x} ${viewBox.y}`"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-plus-circle">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>

</template>

<script>
export default {
  props: {
    nameIcon: {
      type: String,
      default: '',
    },
    strokeColor: {
      type: String,
      default: 'currentColor',
    },
    fillColor: {
      type: String,
      default: 'none',
    },
    height: {
      type: Number,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    viewBox: {
      type: Object,
      default: null,
    },
  },
};
</script>

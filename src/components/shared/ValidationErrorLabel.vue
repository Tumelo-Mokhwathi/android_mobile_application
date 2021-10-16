<template>
  <span class="validation-text text-danger">
    {{ error }}
  </span>
</template>

<script>
export default {
  name: 'AgBs4ValidationErrorLabel',
  props: {
    error: {
      default: null,
      required: false,
      type: String,
    },
  },
};
</script>

<style></style>

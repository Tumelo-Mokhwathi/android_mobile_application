<template>
  <div class="alert alert-dismissible text-center" :class="alertType">
    <a href="#" class="close" @click="$emit('hide-alert')" aria-label="close">
      &times;
    </a>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    alertType: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
  },
  watch: {
    message(newM) {
      this.message = newM;
    },
  },
};
</script>

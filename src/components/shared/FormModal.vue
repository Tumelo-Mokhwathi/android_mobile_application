<template>
  <b-modal
    @close="cancel"
    :hide-footer="hideFooter"
    :id="modalId"
    ref="modal"
    :size="modalSize"
    :title="headingText"
    no-close-on-backdrop
  >
    <form autocomplete="off">
      <b-form-input
        autocomplete="new-password"
        type="password"
        name="disableAutofill"
        class="d-none"
      />
      <slot />
      <toast-notification
        :alert-type="notificationType"
        class="form-group"
        @hide-alert="hideError"
        :message="notificationMessageData"
        v-if="hasNewError"
      />
      <div
        v-if="loading"
        class="form-group text-center"
      >
        <loading-alert />
      </div>
    </form>
    <template #modal-footer>
      <b-button
        @click="submit"
        :disabled="disableSubmit"
        :variant="actionButtonVariant"
      >
        {{ actionButtonText }}
      </b-button>
      <b-button
        @click="cancel"
        size="sm"
        variant="secondary"
      >
        {{ cancelButtonText }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import LoadingAlert from '@/components/shared/LoadingAlert.vue';
import ToastNotification from '@/components/shared/ToastNotification.vue';

export default {
  components: {
    LoadingAlert,
    ToastNotification,
  },
  data() {
    return {
      notificationMessageData: this.notificationMessage,
      hasNewError: false,
    };
  },
  methods: {
    cancel() {
      this.$emit('closed');
    },
    hideError() {
      this.notificationMessageData = '';
    },
    submit() {
      this.$emit('submitted');
    },
  },
  name: 'FormModal',
  props: {
    actionButtonText: {
      default: 'Submit',
      type: String,
    },
    actionButtonVariant: {
      default: 'primary',
      type: String,
    },
    cancelButtonText: {
      default: 'Cancel',
      type: String,
    },
    disableSubmit: {
      required: true,
      type: Boolean,
    },
    headingText: {
      required: true,
      type: String,
    },
    hideFooter: {
      default: false,
      required: false,
      type: Boolean,
    },
    loading: {
      required: false,
      type: Boolean,
    },
    modalId: {
      required: true,
      type: String,
    },
    modalSize: {
      default: () => 'md',
      required: false,
      type: String,
    },
    notificationMessage: {
      required: true,
      type: String,
    },
    notificationType: {
      required: true,
      type: String,
    },
  },
  watch: {
    notificationMessage(newVal) {
      this.notificationMessageData = newVal;
    },
    notificationMessageData(newVal) {
      this.hasNewError = !!newVal && newVal !== '';
    },
  },
};
</script>
<style>
.modal-backdrop {
  display: none !important;
}
</style>

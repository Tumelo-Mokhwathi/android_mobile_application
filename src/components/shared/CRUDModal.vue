<template>
  <validation-observer v-slot="{ handleSubmit, invalid }">
    <form-modal
      :action-button-text="formState.actionButtonText"
      :action-button-variant="formState.actionButtonVariant"
      :cancel-button-text="formState.cancelButtonText"
      @closed="$emit('close-modal')"
      :disable-submit="IsLoading || invalid"
      :heading-text="formState.headingText"
      :loading="IsLoading"
      :modal-id="modalId"
      :notification-message="notification.message"
      :notification-type="notification.type"
      @submitted="handleSubmit(submit)"
    >
    <p v-if="formState === formStates.delete">
      Are you sure you want to delete this user '{{ localPayload.name }}'?
    </p>
    <slot v-else-if="[formStates.create, formStates.edit].includes(formState)">
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required">
            <b-form-input
              name="name"
              placeholder="Name"
              type="text"
              v-model="localPayload.name"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required">
            <b-form-input
              name="surname"
              placeholder="Surname"
              type="text"
              v-model="localPayload.surname"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required|email">
            <b-form-input
              name="email"
              placeholder="Email"
              type="email"
              v-model="localPayload.email"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required|contactNo">
            <b-form-input
              name="contactNo"
              placeholder="Contact Number"
              type="text"
              v-model="localPayload.phone"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required">
            <b-form-input
              name="username"
              placeholder="User Name"
              type="text"
              v-model="localPayload.username"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required|password">
            <b-form-input
              name="password"
              placeholder="Password"
              type="password"
              v-model="localPayload.password"
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
        <b-form-group>
          <validation-provider v-slot="{ errors }" rules="required">
            <b-form-checkbox
              v-model="localPayload.active"
              name="active"
              switch
            />
            <validation-error-label :error="errors[0]" />
          </validation-provider>
        </b-form-group>
      </slot>
    </form-modal>
  </validation-observer>
</template>
<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import FormModal from '@/components/shared/FormModal.vue';
import ValidationErrorLabel from '@/components/shared/ValidationErrorLabel.vue';

extend('email', {
  ...email,
  message: 'Email address invalid',
});
extend('password', {
  validate: (value) => {
    const passwordString = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return !!passwordString.test(value);
  },
  message:
    'The password must at leastcontant: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character',
});
extend('required', {
  ...required,
  message: 'This field is required',
});
extend('contactNo', {
  validate: (value) => {
    const phoneNumber = /^((\+27)|0)(\d{2})-?(\d{3})-?(\d{4}|\d{8})$/;
    return !!phoneNumber.test(value);
  },
  message: 'Phone number is invalid',
});
export default {
  components: {
    FormModal,
    ValidationErrorLabel,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      localPayload: {},
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.localPayload);
    },
  },
  mounted() {
    this.localPayload = this.payload;
  },
  props: {
    notification: {
      required: true,
      type: Object,
    },
    formState: {
      required: true,
      type: Object,
    },
    formStates: {
      required: true,
      type: Object,
    },
    IsLoading: {
      required: true,
      type: Boolean,
    },
    modalId: {
      required: true,
      type: String,
    },
    payload: {
      required: true,
      type: Object,
    },
  },
  watch: {
    payload(newPayload) {
      this.localPayload = newPayload;
    },
  },
};
</script>

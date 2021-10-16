<template>
  <b-container class="mt-5 pt-5" fluid>
    <b-row class="h-100 no-gutters mt-3">
      <b-col
        cols="10"
        offset="1"
        offset-md="3"
        offset-xl="4"
        offset-sm="4"
        offset-xs="4"
        md="6"
        xl="4"
        sm="4"
      >
        <b-card class="text-center mt-5" header="Authentication">
          <b-card-body>
            <validation-observer v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(submit)">
                <b-form-group>
                  <validation-provider v-slot="{ errors }">
                    <b-row>
                      <b-col cols="1">
                        <b-icon-envelope-fill class="m-0" scale="2" />
                      </b-col>
                      <b-col cols="10">
                        <b-form-input
                          name="email"
                          placeholder="Email"
                          v-model="payload.email"
                          type="email"
                        />
                      </b-col>
                    </b-row>
                    <validation-error-label :error="errors[0]" />
                  </validation-provider>
                </b-form-group>
                <b-form-group>
                  <validation-provider v-slot="{ errors }">
                    <b-row>
                      <b-col cols="1">
                        <b-icon-lock-fill class="m-0" scale="2" />
                      </b-col>
                      <b-col cols="10">
                        <b-form-input
                          name="password"
                          placeholder="Password"
                          v-model="payload.password"
                          type="password"
                        />
                      </b-col>
                    </b-row>
                    <validation-error-label :error="errors[0]" />
                  </validation-provider>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-button
                      block
                      class="mb-0 w-50 offset-3"
                      type="submit"
                      variant="primary"
                    >
                      <span>Login</span>
                    </b-button>
                  </b-col>
                </b-row>
              </form>
            </validation-observer>
          </b-card-body>
          <b-card-body v-if="ErrorMessage">
            <b-row>
              <b-col cols="10" class="offset-1">
                <b-alert show variant="danger">
                  {{ ErrorMessage }}
                </b-alert>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vee-validate/dist/rules';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { BIconEnvelopeFill, BIconLockFill } from 'bootstrap-vue';

import ValidationErrorLabel from '../components/shared/ValidationErrorLabel.vue';

extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  components: {
    BIconEnvelopeFill,
    BIconLockFill,
    ValidationErrorLabel,
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters({
      ErrorMessage: 'usersStore/ErrorMessage',
      Loading: 'usersStore/IsLoading',
      Users: 'usersStore/Data',
    }),
  },
  data() {
    return {
      payload: {},
    };
  },
  methods: {
    ...mapActions({
      Login: 'usersStore/Login',
    }),
    submit() {
      this.Login(this.payload);
    },
  },
  name: 'Landing',
};
</script>
<style scoped>
.login-input {
  border-width: 0 0 2px;
}
</style>

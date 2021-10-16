<template>
  <b-container fluid class="mt-5 pt-5">
    <b-row class="mb-3">
      <h3 class="col-12 col-md-8">Users</h3>
      <b-col class="text-right" cols="12" md="4">
        <b-button
          variant="primary"
          class="ml-3"
          @click="setupModifyModal(formStates.create, null)"
        >
          Create
        </b-button>
      </b-col>
    </b-row>
    <grid
      :fields="fields"
      :isBusy="Loading"
      :values="Users"
      :tableId="'TableId1'"
    >
      <template v-slot:cell(active)="row">
        {{ row.item.active | changeStatus(row.item.active) }}
      </template>
      <template v-slot:cell(actions)="row">
        <b-button-group size="sm">
          <b-button
            @click="gridActionClicked(formStates.edit, row.item)"
            title="Edit"
            variant="outline-primary"
          >
            <b-icon-pencil-square />
          </b-button>
          <b-button
            @click="gridActionClicked(formStates.delete, row.item)"
            title="Delete"
            variant="outline-danger"
          >
            <b-icon-trash />
          </b-button>
          <b-button
              @click="viewDetails(row.item)"
              title="View Form Details"
              variant="outline-secondary"
            >
              <b-icon-eye />
            </b-button>
        </b-button-group>
      </template>
    </grid>
    <crud-modal
      @close-modal="closeModal"
      :form-state="formState"
      :form-states="formStates"
      :modal-id="modifyModalId"
      :is-loading="Loading"
      :is-submit-disabled="false"
      :notification="notification"
      :payload="payload"
      @submit="submitHandler"
    />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Grid from '@/components/shared/Grid.vue';
import CrudModal from '@/components/shared/CRUDModal.vue';

export default {
  components: {
    Grid,
    CrudModal,
  },
  computed: {
    ...mapGetters({
      Loading: 'usersStore/IsLoading',
      Users: 'usersStore/Data',
    }),
    emptyPayload: () => ({
      email: '',
      name: '',
      password: '',
      phone: '',
      surname: '',
      username: '',
      active: false,
    }),
    fields() {
      return [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'surname',
          label: 'Surname',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Contact No.',
          sortable: true,
        },
        {
          key: 'username',
          label: 'User Name',
          sortable: true,
        },
        {
          key: 'active',
          label: 'Is Active',
          sortable: true,
        },
        {
          key: 'actions',
          label: 'Action',
          sortable: true,
        },
      ];
    },
    formStates() {
      return {
        create: {
          actionButtonText: 'Create',
          actionButtonVariant: 'primary',
          cancelButtonText: 'Cancel',
          headingText: 'Create',
          submitMethod: this.Create,
        },
        delete: {
          actionButtonText: 'Delete',
          actionButtonVariant: 'danger',
          cancelButtonText: 'No',
          headingText: 'Delete',
          submitMethod: this.Delete,
        },
        edit: {
          actionButtonText: 'Edit',
          actionButtonVariant: 'primary',
          cancelButtonText: 'Cancel',
          headingText: 'Update',
          submitMethod: this.Update,
        },
      };
    },
    modifyModalId() {
      return `modifyModal-${Math.random()}`;
    },
    UsersList() {
      if (!this.Users || this.Users.length < 1) {
        return [];
      }
      return this.Users;
    },
  },
  created() {
    this.formState = this.formStates.create;
  },
  data() {
    return {
      formState: null,
      notification: {
        message: '',
        type: 'alert-danger',
      },
      payload: {},
    };
  },
  filters: {
    changeStatus(value) {
      return (!value) ? 'No' : 'Yes';
    },
  },
  methods: {
    ...mapActions({
      Create: 'usersStore/Create',
      Delete: 'usersStore/Delete',
      Update: 'usersStore/Update',
      Load: 'usersStore/Load',
    }),
    closeModal() {
      this.notification.message = '';
      this.$bvModal.hide(this.modifyModalId);
    },
    gridActionClicked(formState, payload) {
      this.formState = formState;
      this.setupModifyModal(formState, payload);
    },
    setupModifyModal(formState, payload) {
      if (!payload) {
        this.payload = { ...this.emptyPayload };
      } else {
        this.payload = { ...payload };
      }
      this.formState = formState;
      this.$bvModal.show(this.modifyModalId);
    },
    submitHandler(payload) {
      this.payload = payload;
      this.submit();
    },
    submit() {
      this.notification.message = '';
      this.formState
        .submitMethod(this.payload)
        .then(() => {
          this.$bvModal.hide(this.modifyModalId);
        })
        .catch((error) => {
          if (!error) {
            this.notification.message = 'An error occurred';
            return;
          }
          const message = error
            && error.response
            && error.response.data
            && error.response.data.message
            ? error.response.data.message
            : error.toString();
          this.notification.message = message;
        });
    },
    viewDetails(details) {
      this.$router.push({ name: 'Details', params: { id: details.id, data: details } });
    },
  },
  mounted() {
    this.Load();
  },
};
</script>

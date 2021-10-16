<template>
  <content-details
    back-to="Admin"
    header-text="Users Details"
    class="mt-5 pt-3"
    :detail-description="`Details for ${Details.username}`"
  >
    <template #content>
      <slot v-if="!!Details">
        <dl class="row modal-body">
          <dt :class="dtClasses">Name:</dt>
          <dd :class="ddClasses">{{ Details.name }}</dd>
          <dt :class="dtClasses">Surname:</dt>
          <dd :class="ddClasses">{{ Details.surname }}</dd>
          <dt :class="dtClasses">Email:</dt>
          <dd :class="ddClasses">{{ Details.email }}</dd>
          <dt :class="dtClasses">Contact:</dt>
          <dd :class="ddClasses">{{ Details.phone }}</dd>
          <dt :class="dtClasses">Username:</dt>
          <dd :class="ddClasses">{{ Details.username }}</dd>
          <dt :class="dtClasses">Is Active:</dt>
          <dd :class="ddClasses">
            {{ Details.active | changeStatus(Details.active) }}
          </dd>
        </dl>
      </slot>
    </template>
  </content-details>
</template>

<script>
import ContentDetails from '@/components/shared/ContentDetails.vue';

export default {
  components: {
    ContentDetails,
  },
  created() {
    this.Details = this.$route.params.data;
  },
  computed: {
    ddClasses: () => ['col-6'],
    dtClasses: () => ['col-6', 'font-weight-bold', 'text-right'],
  },
  data() {
    return {
      Details: null,
    };
  },
  filters: {
    changeStatus(value) {
      return !value ? 'No' : 'Yes';
    },
  },
  name: 'Details',
};
</script>

<style></style>

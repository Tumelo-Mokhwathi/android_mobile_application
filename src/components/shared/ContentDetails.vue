<template>
  <b-container fluid>
    <b-row class="text-center offset-3">
      <b-col>
        <the-view-header :text="headerText" />
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-md="3" offset-xl="4">
        <b-card-group deck class="col-6">
          <b-card :header="detailDescription" header-tag="header">
            <slot name="content">
              <p class="bg-danger text-white">DETAILS NOT SET UP</p>
            </slot>
            <div class="text-center">
              <b-button @click="goBack" variant="primary"> Back to list </b-button>
            </div>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { BButton, BContainer } from 'bootstrap-vue';

import TheViewHeader from '@/components/shared/TheViewHeader.vue';

export default {
  components: {
    BButton,
    BContainer,
    TheViewHeader,
  },
  methods: {
    goBack() {
      this.$router.push({ name: this.backTo });
    },
  },
  name: 'Details',
  props: {
    backTo: {
      required: true,
      type: String,
    },
    detailDescription: {
      required: true,
      type: String,
    },
    headerText: {
      required: true,
      type: String,
    },
  },
};
</script>

<style></style>

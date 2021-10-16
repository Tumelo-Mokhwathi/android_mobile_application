<template>
  <b-row>
    <h1 class="col-12 col-md-8">
      {{ text }}
    </h1>
    <b-col
      class="text-right"
      cols="12"
      md="4"
    >
      <b-button-group>
        <slot name="actionButtons" />
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BButtonGroup,
  BCol,
  BRow,
} from 'bootstrap-vue';

export default {
  components: {
    BButtonGroup,
    BCol,
    BRow,
  },
  props: {
    text: {
      required: true,
      type: String,
    },
  },
  name: 'TheViewHeader',
};
</script>

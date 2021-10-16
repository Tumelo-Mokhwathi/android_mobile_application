<template>
  <b-row>
    <b-col
      cols="6"
      lg="4"
      xl="3"
    >
      <b-input-group prepend="Entries Size">
        <b-form-select
          id="perPageSelect"
          :options="pageOptions"
          v-model="perPage" />
      </b-input-group>
    </b-col>
    <b-col
      cols="6"
      lg="4"
      offset-lg="4"
      offset-xl="5"
    >
      <b-form-group>
        <float-label>
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Search" />
        </float-label>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import FloatLabel from 'vue-float-label/components/FloatLabel.vue';

export default {
  components: {
    FloatLabel,
  },
  data() {
    return {
      filter: null,
      pageOptions: [5, 10, 15, 25, 50],
      perPage: 10,
    };
  },
  watch: {
    filter(newV) {
      this.$emit('search', newV);
    },
    perPage(newV) {
      this.$emit('page-to-display', newV);
    },
  },
};
</script>

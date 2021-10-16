<template>
  <div>
    <table-filtering
      @search="searchTable"
      @page-to-display="displayPage" />
    <b-table
      bordered
      :current-page="currentPage"
      :busy="isBusy"
      :fields="fields"
      :filter="filter"
      @filtered="onFiltered"
      head-variant="dark"
      :id="tableId"
      :items="values"
      :per-page="perPage"
      sticky-header="true"
      striped
      show-empty
    >
      <template v-slot:table-busy>
        <loading-alert></loading-alert>
      </template>
      <template v-for="(_, slot) in $scopedSlots"
        v-slot:[slot]="props">
        <slot
          :name="slot"
          v-bind="props" />
      </template>
    </b-table>
    <table-pagination
     @selected-page="goToPage"
     :total-filtered-records="totalFilteredRecords"
     :page-number="currentPage"
     :per-page="perPage" />
  </div>
</template>

<script>
import LoadingAlert from './LoadingAlert.vue';
import TableFiltering from './Filtering.vue';
import TablePagination from './Pagination.vue';

export default {
  components: {
    LoadingAlert,
    TableFiltering,
    TablePagination,
  },
  data() {
    return {
      currentPage: 1,
      filter: null,
      formState: null,
      perPage: 10,
      totalFilteredRecords: 0,
    };
  },
  methods: {
    displayPage(val) {
      this.perPage = val;
    },
    goToPage(page) {
      this.currentPage = page;
    },
    searchTable(val) {
      this.filter = val;
    },
    onFiltered(filteredItems) {
      this.totalFilteredRecords = filteredItems.length;
      this.currentPage = 1;
    },
  },
  mounted() {
    this.totalFilteredRecords = (!this.values) ? 0 : this.values.length;
  },
  name: 'TableGrid',
  props: {
    fields: {
      required: true,
      type: Array,
    },
    isBusy: {
      default: false,
      type: Boolean,
    },
    tableId: {
      default: 'TableGrid',
      required: false,
      type: String,
    },
    values: {
      required: false,
      type: Array,
    },
  },
  watch: {
    values(newV) {
      this.totalFilteredRecords = (!newV) ? 0 : newV.length;
    },
  },
};
</script>

<style>
</style>

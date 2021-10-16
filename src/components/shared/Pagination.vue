<template>
  <b-row>
    <b-col cols="6" lg="4" xl="3">
      Showing {{recordsFrom}} to {{recordsTo}} of {{totalFilteredRecords}} entries
    </b-col>
    <b-col cols="6" offset-lg="4" lg="4" offset-xl="5" xl="4">
      <b-pagination
        class="float-right"
        :per-page="perPage"
        :total-rows="totalFilteredRecords"
        v-model="currentPage"
      ></b-pagination>
    </b-col>
  </b-row>
</template>

<script>
export default {
  computed: {
    recordsFrom() {
      if (this.totalFilteredRecords === 0) {
        return this.totalFilteredRecords;
      }
      if (this.pageNumber * this.perPage >= this.totalFilteredRecords) {
        return (this.pageNumber - 1) * this.perPage + 1;
      }
      if (this.recordsTo !== this.perPage) {
        return this.recordsTo - this.perPage + 1;
      }
      return 1;
    },
    recordsTo() {
      if (this.pageNumber * this.perPage > this.totalFilteredRecords) {
        return this.totalFilteredRecords;
      }
      return this.pageNumber * this.perPage;
    },
  },
  data() {
    return {
      currentPage: this.pageNumber,
    };
  },
  props: {
    pageNumber: {
      required: true,
      type: Number,
    },
    perPage: {
      default: 10,
      required: true,
      type: Number,
    },
    totalFilteredRecords: {
      required: true,
      type: Number,
    },
  },
  watch: {
    currentPage(newV) {
      this.$emit('selected-page', newV);
    },
    pageNumber(newV) {
      this.currentPage = newV;
    },
  },
};
</script>

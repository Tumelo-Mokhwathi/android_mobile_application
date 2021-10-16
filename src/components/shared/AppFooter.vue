<template>
  <footer class="fixed-bottom bg-dark border-top py-1">
    <b-container fluid>
      <b-row>
        <b-col class="col-md-6">
          <a href="#" class="text-light">{{ currentYear }} © </a>|
          <a href="#" class="text-light">Created By Tumelo Mokhwathi</a>
          |
          <a href="#" class="text-light">{{ version }}</a>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    currentYear: {
      required: true,
      type: Number,
    },
    version: {
      required: true,
      type: String,
    },
  },
};
</script>

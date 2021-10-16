<template>
  <div class="header">
    <b-navbar fixed="top" type="dark" variant="primary">
    <slot name="logo" />
    <slot name="menu" />
  </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
};
</script>
<style></style>

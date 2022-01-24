<template>
  <div id="app">
    <notifications position="bottom right" />
    <notifications
      group="error"
      classes="vue-notification error"
      position="bottom right"
    />
    <ClientList />
  </div>
</template>

<script>
import ClientList from './components/ClientList.vue';

export default {
  name: 'App',
  components: {
    ClientList,
  },
};
</script>

<style lang="scss">
#app {
  padding: 90px 0px;
  width: 80%;
  margin: 0px auto;
}

.vue-notification {
  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>

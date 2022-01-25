<template>
  <tr class="clients-table__row">
    <td class="clients-table__td">{{ client.name }}</td>
    <td class="clients-table__td">
      <a :href="clientEmailLink" class="clients-table__email">{{
        client.email
      }}</a>
    </td>
    <td class="clients-table__td">
      <a :href="clientPhoneLink" class="clients-table__phone">{{
        client.phone | VMask('###-###-####')
      }}</a>
    </td>
    <td class="clients-table__td">{{ providerNames }}</td>
    <td class="clients-table__td">
      <div class="clients-table__btn" @click="$emit('edit-client', client)">
        Edit
      </div>
    </td>
    <td class="clients-table__td">
      <div class="clients-table__btn" @click="$emit('delete-client', client)">
        Delete
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ClientList',
  props: {
    client: Object,
  },
  computed: {
    providerNames() {
      const providerNames = this.client.providers.map(function (provider) {
        return provider.name;
      });
      return providerNames.join(', ');
    },
    clientPhoneLink() {
      return `tel:+${this.client.phone}`;
    },
    clientEmailLink() {
      return `mailto:${this.client.email}`;
    },
  },
};
</script>

<style scoped lang="scss">
.clients-table {
  &__td {
    padding: 10px 20px;
    border: 1px solid #e1e1e1;
    border-left: 0px;
    border-top: 0px;
    &:first-of-type {
      border-left: 1px solid #e1e1e1;
    }
  }
  &__phone,
  &__email {
    color: #6f6f6f;
    text-decoration: none;
    &:hover {
      color: #5f5f5f;
      text-decoration: none;
      cursor: pointer;
    }
  }
  &__btn {
    color: #7d9ca8;
    text-decoration: none;
    &:hover {
      color: #98bcca;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>

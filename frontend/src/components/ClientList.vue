<template>
  <div class="c-client-list">
    <loading :active="isLoadingActive"></loading>
    <div class="c-title">
      <div class="title__text">Clients</div>
      <button class="title__btn" @click="openCreateModal">New Client</button>
    </div>
    <table class="clients-table">
      <thead class="clients-table__thead">
        <th class="clients-table__th">Name</th>
        <th class="clients-table__th">Email</th>
        <th class="clients-table__th">Phone</th>
        <th class="clients-table__th">Providers</th>
        <th class="clients-table__th"></th>
        <th class="clients-table__th"></th>
      </thead>
      <tbody class="clients-table__tbody">
        <client-row
          v-for="client in clients"
          :key="client._id"
          :client="client"
          @edit-client="openEditModal"
          @delete-client="deleteClient"
        ></client-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as ClientApi from '../api/client';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import ClientRow from './ClientRow.vue';
import ClientModal from './modal/ClientModal.vue';

export default {
  name: 'ClientList',
  data() {
    return {
      errors: {},
      clients: [],
      isLoadingActive: false,
    };
  },
  components: {
    Loading: VueLoading,
    ClientRow: ClientRow,
  },
  methods: {
    openEditModal(client) {
      this.$modal.show(
        ClientModal,
        {
          title: 'Edit Client',
          client,
          submitBtnText: 'Save Client',
          clientMethod: (data) => this.editClient(data),
          refetchClients: this.refetchClients,
          errors: () => this.$data.errors,
        },
        { height: 'auto', name: 'ClientModal', width: 700 },
        {
          'before-close': () => {
            this.errors = {};
          },
        }
      );
    },
    openCreateModal() {
      this.$modal.show(
        ClientModal,
        {
          title: 'New Client',
          submitBtnText: 'Add Client',
          eventName: 'create-client',
          clientMethod: (data) => this.createClient(data),
          errors: () => this.$data.errors,
        },
        { height: 'auto', name: 'ClientModal', width: 700 },
        {
          'before-close': () => {
            this.errors = {};
          },
        }
      );
    },
    refetchClients() {
      this.isLoadingActive = true;
      ClientApi.list()
        .then(({ data }) => {
          this.clients = data.clients;
          this.isLoadingActive = false;
        })
        .catch((e) => console.error(e));
    },
    deleteClient(client) {
      if (confirm(`Do you really want to delete a client - ${client.name}`)) {
        ClientApi.remove(client._id)
          .then(({ data }) => {
            this.$notify({
              title: 'Client deleted',
              text: `Client - ${data.client.name} deleted successfuly`,
            });
            this.refetchClients();
            this.isLoadingActive = false;
          })
          .catch((e) => console.error(e));
      }
    },
    createClient(data) {
      this.isLoadingActive = true;
      ClientApi.create(data)
        .then(({ data }) => {
          this.errors = {};
          this.isLoadingActive = false;
          this.$modal.hide('ClientModal');
          this.$notify({
            title: 'Client created',
            text: `Client - ${data.client.name} created successfuly`,
          });
          this.refetchClients();
        })
        .catch((error) => {
          this.$notify({
            group: 'error',
            title: `Something went wrong, сlient not created.`,
          });
          this.isLoadingActive = false;
          this.collectErrors(error.response.data ?? []);
        });
    },
    editClient(data) {
      this.isLoadingActive = true;
      ClientApi.update(data)
        .then(({ data }) => {
          this.errors = {};
          this.isLoadingActive = false;
          this.$modal.hide('ClientModal');
          this.$notify({
            title: 'Client updated',
            text: `Client - ${data.client.name} updated successfuly`,
          });
          this.refetchClients();
        })
        .catch((error) => {
          console.log(error);
          this.$notify({
            group: 'error',
            title: `Something went wrong, сlient not updated.`,
          });
          this.isLoadingActive = false;
          this.collectErrors(error.response.data ?? []);
        });
    },
    collectErrors(errors) {
      this.errors = {};
      errors.forEach(({ param, msg }) => {
        const fieldName = param.split('.').slice(-1).pop();
        this.errors[fieldName] = msg;
      });
    },
  },
  created() {
    this.refetchClients();
  },
};
</script>

<style scoped lang="scss">
.c-title {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f5f8;
}

.title {
  &__text {
    color: #547582;
    font-weight: bold;
    font-size: 24px;
  }
  &__btn {
    background-color: #ededec;
    font-size: 16px;
    color: #6f6f6f;
    padding: 5px 10px;
    border-radius: 6px;
    border: 1px solid #dcdfe2;
    cursor: pointer;
    text-align: center;
    width: 150px;
    &:hover {
      background-color: #ddd8d8;
    }
    &:active {
      background-color: #ccc7c7;
    }
  }
}

.clients-table {
  width: 100%;
  text-align: left;
  border: none;
  border-spacing: 0px;
  &__thead {
    background-color: #ededec;
    color: #6f6f6f;
  }
  &__th {
    padding: 10px 20px;
    border: 1px solid #e1e1e1;
    border-left: 0px;
    &:first-of-type {
      border-left: 1px solid #e1e1e1;
    }
  }
}
</style>

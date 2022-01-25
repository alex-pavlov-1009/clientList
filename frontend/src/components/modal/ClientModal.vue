<template>
  <div>
    <div class="modal-title">{{ title }}</div>
    <div class="modal-body">
      <div class="modal-body__line">
        <label class="modal-body__input">
          <span class="modal-body__input-label">Name:</span>
          <div v-if="errors().name" class="modal-body__input-error">
            {{ errors().name }}
          </div>
          <input
            type="text"
            class="modal-body__input-content"
            v-model="formData.name"
          />
        </label>
      </div>
      <div class="modal-body__line">
        <label class="modal-body__input">
          <span class="modal-body__input-label">Email:</span>
          <div v-if="errors().email" class="modal-body__input-error">
            {{ errors().email }}
          </div>
          <input
            class="modal-body__input-content"
            type="email"
            v-model="formData.email"
          />
        </label>
      </div>
      <div class="modal-body__line">
        <label class="modal-body__input">
          <span class="modal-body__input-label">Phone:</span>
          <div v-if="errors().phone" class="modal-body__input-error">
            {{ errors().phone }}
          </div>
          <input
            type="text"
            class="modal-body__input-content"
            v-model="formData.phone"
            v-mask="'###-###-####'"
          />
        </label>
      </div>
      <div class="modal-body__line">
        <label class="modal-body__input">
          <span class="modal-body__input-label">Providers:</span>
          <input
            type="text"
            class="modal-body__input-content modal-body__input-content_short"
            v-model="newProvider"
          />
        </label>
        <button @click="addProvider" class="modal__btn">Add provider</button>
      </div>
      <div class="modal-body__line">
        <span class="modal-body__input-label"></span>
        <div class="modal-body__checklist">
          <div
            class="c-checkbox"
            v-for="provider in providers"
            :key="provider._id"
          >
            <input
              class="modal-body__checkbox"
              type="checkbox"
              :id="provider._id"
              :value="provider._id"
              v-model="formData.providers"
            />
            <label class="modal-body__checkbox-label" :for="provider._id">{{
              provider.name
            }}</label>
            <div
              @click="editProvider(provider)"
              class="modal-body__checkbox-icon"
            >
              <i class="fa fa-edit"></i>
            </div>
            <div
              @click="deleteProvider(provider)"
              class="modal-body__checkbox-icon"
            >
              <i class="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="modal__btn" @click="$emit('close')">Cancel</button>
      <button class="modal__btn" @click="clientMethod(formData)">
        {{ submitBtnText }}
      </button>
    </div>
  </div>
</template>

<script>
import * as ProviderApi from '../../api/provider';
export default {
  name: 'ClientModal',
  props: {
    title: String,
    client: {
      type: Object,
      default() {
        return {
          name: '',
          email: '',
          phone: '',
          providers: [],
        };
      },
    },
    submitBtnText: String,
    clientMethod: Function,
    refetchClients: Function,
    errors: Function,
  },
  data() {
    return {
      providers: [],
      formData: this.getInitialFormData(),
      newProvider: '',
    };
  },
  methods: {
    getInitialFormData() {
      const result = Object.assign({}, this.client);
      const providerIds = result.providers.map((provider) => provider._id);
      result.providers = providerIds;
      return result;
    },
    refetchProviders() {
      this.isLoadingActive = true;
      ProviderApi.list()
        .then(({ data }) => {
          this.providers = data.providers;
          this.isLoadingActive = false;
        })
        .catch((e) => console.error(e));
    },
    addProvider() {
      if (this.newProvider.length === 0) {
        return;
      }
      this.isLoadingActive = true;
      ProviderApi.add({ name: this.newProvider })
        .then(({ data }) => {
          this.$notify({
            title: 'Provider added',
            text: `Provider - ${data.provider.name} added successfuly`,
          });
          this.isLoadingActive = false;
          this.newProvider = '';
          this.refetchProviders();
        })
        .catch((e) => console.error(e));
    },
    editProvider(provider) {
      const newProviderName = prompt(
        `Change the name of provider`,
        provider.name
      );
      if (newProviderName.length === 0) {
        this.$notify({
          group: 'error',
          title: 'Provider not updated',
          text: `Provider - name is empty`,
        });
        return;
      }
      this.isLoadingActive = true;
      ProviderApi.update({ _id: provider._id, name: newProviderName })
        .then(({ data }) => {
          this.$notify({
            title: 'Provider updated',
            text: `Provider - ${data.provider.name} updated successfuly`,
          });
          this.isLoadingActive = false;
          this.refetchProviders();
          this.refetchClients();
        })
        .catch((e) => console.error(e));
    },
    deleteProvider(provider) {
      this.isLoadingActive = true;
      ProviderApi.remove(provider._id)
        .then(({ data }) => {
          this.$notify({
            title: 'Provider deleted',
            text: `Provider - ${data.provider.name} deleted successfuly`,
          });
          this.isLoadingActive = false;
          this.refetchProviders();
          this.refetchClients();
        })
        .catch((e) => console.error(e));
    },
  },
  created() {
    this.refetchProviders();
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  color: #547582;
  padding: 10px 20px;
  border-bottom: 1px solid #dcdfe2;
  font-size: 22px;
}

.c-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0px;
  }
}

.modal-body {
  width: 80%;
  margin: 0px auto;
  font-size: 14px;
  padding: 20px 0px;
  &__line {
    position: relative;
    display: flex;
    margin-bottom: 25px;
  }
  &__checklist {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    border: 1px solid #dcdfe2;
    border-radius: 6px;
    padding: 20px;
  }
  &__checkbox {
    cursor: pointer;
    border: 1px solid #dcdfe2;
    border-radius: 6px;
    transform: scale(1.3);
    &-label {
      width: 115px;
      cursor: pointer;
      padding: 0px 10px;
      font-size: 14px;
    }
    &-icon {
      margin: 0px 5px;
      &:hover {
        color: rgb(172, 58, 58);
        cursor: pointer;
      }
    }
  }
  &__input {
    display: flex;
    align-items: center;
    &-label {
      text-align: right;
      width: 100px;
      display: block;
      padding-right: 20px;
    }
    &-error {
      position: absolute;
      top: 35px;
      left: 125px;
      color: rgb(172, 58, 58);
    }
    &-content {
      border: 1px solid #dcdfe2;
      border-radius: 6px;
      padding: 0px 10px;
      width: 350px;
      height: 30px;
      &_short {
        width: 220px;
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid #dcdfe2;
}

.modal__btn {
  margin-left: 10px;
  background-color: #ededec;
  font-size: 16px;
  color: #6f6f6f;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #dcdfe2;
  text-align: center;
  width: 120px;
  cursor: pointer;
  &:hover {
    background-color: #ddd8d8;
  }
  &:active {
    background-color: #ccc7c7;
  }
}
</style>

<template>
  <div class="column full-width" v-if="contactTemp">
    <div class="row" v-if="!props.isNew">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[0]') }}</div>
      <div class="col-grow">{{ contact.id }}</div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[1]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.first_name"
          :label="$t('listLabels[1]')"
          clearable
          :rules="[
            (val) =>
              InputValidator.required(val) || $t('inputValidation.required'),
            (val, rules) =>
              InputValidator.textMax15(val) ||
              $t('inputValidation.limitText15'),
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[2]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.last_name"
          :label="$t('listLabels[2]')"
          clearable
          required
          :rules="[
            (val) =>
              InputValidator.required(val) || $t('inputValidation.required'),
            (val, rules) =>
              InputValidator.textMax15(val) ||
              $t('inputValidation.limitText15'),
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[4]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.address"
          :label="$t('listLabels[4]')"
          clearable
          :rules="[
            (val, rules) =>
              InputValidator.textMax256(val) ||
              $t('inputValidation.limitText256'),
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[5]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.phone"
          :label="$t('listLabels[5]')"
          clearable
          :rules="[
            (val, rules) =>
              InputValidator.mobile(val) || $t('inputValidation.phoneFormat'),
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[7]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.emergency_name"
          :label="$t('listLabels[7]')"
          clearable
          :rules="[
            (val, rules) =>
              InputValidator.textMax15(val) ||
              $t('inputValidation.limitText15'),
          ]"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[8]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.emergency_phone"
          :label="$t('listLabels[8]')"
          clearable
          :rules="[
            (val, rules) =>
              InputValidator.mobile(val) || $t('inputValidation.phoneFormat'),
          ]"
        />
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[11]') }}</div>
      <div class="col-grow">
        <q-input
          v-model="contactTemp.email"
          :label="$t('listLabels[11]')"
          clearable
          :rules="[
            (val, rules) => rules.email(val) || $t('inputValidation.email'),
          ]"
        />
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[6]') }}</div>
      <div class="col-grow">
        <q-select
          v-model="contactTemp.company"
          :options="companyOptions"
          :label="$t('listCompanyLabel')"
          option-label="name"
          option-value="id"
          class="select-options"
        />
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[5]') }}</div>
      <div class="col-grow">
        {{ groups.length > 0 ? groups.map((g) => g.name).join(', ') : ' ' }}
      </div>
    </div> -->
    <div class="row no-wrap justify-evenly q-pt-md">
      <q-btn
        :label="$t('detailCancelButton')"
        @click="isOpenCancelDialog = true"
        class="cus-btn"
      />
      <!-- TODO: Disable button when invalid input -->
      <q-btn
        color="primary"
        :label="$t('detailSaveButton')"
        @click="isOpenSaveDialog = true"
        class="cus-btn"
        :disable="!checkEmptyContact()"
      />
    </div>
  </div>
  <!-- Confirm cancel dialog -->
  <ConfirmDialog
    :title="
      props.isNew
        ? t('detailCancelCreateContactPrompt')
        : t('detailCancelContactPrompt')
    "
    :isShown="isOpenCancelDialog"
    @yes="confirmCancel"
    @cancel="isOpenCancelDialog = false"
  />
  <!-- Confirm save dialog -->
  <ConfirmDialog
    :title="t('detailSaveContactPrompt')"
    :isShown="isOpenSaveDialog"
    @yes="confirmSave"
    @cancel="isOpenSaveDialog = false"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Contact, Company } from './models';
// import { useQuasar } from 'quasar';
import InputValidator from './validation-rules';
import ConfirmDialog from './ConfirmDialog.vue';

const { t } = useI18n();
// const $q = useQuasar();
interface Props {
  contact: Contact;
  isNew: boolean;
  companyOptions: Array<Company>;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'cancelEdit'): void;
  (e: 'saveEdit', newContact: Contact): void;
  (e: 'cancelCreate'): void;
  (e: 'saveCreate', newContact: Contact): void;
}>();

const contactTemp = ref<Contact>({ ...props.contact });

const isOpenCancelDialog = ref<boolean>(false);
const isOpenSaveDialog = ref<boolean>(false);

function checkEmptyContact() {
  return (
    contactTemp.value && contactTemp.value.first_name && contactTemp.value.last_name
  );
}

// function saveContact() {
//   emit('saveEdit', contactTemp.value);
// }
function confirmCancel() {
  if (props.isNew) {
    emit('cancelCreate');
  } else {
    emit('cancelEdit');
  }
  isOpenCancelDialog.value = false;
  // $q.dialog({
  //   title: props.isNew
  //     ? t('detailCancelCreateContactPrompt')
  //     : t('detailCancelContactPrompt'),
  //   cancel: t('detailNo'),
  //   persistent: true,
  //   ok: t('detailYes'),
  // })
  //   .onOk(() => {
  //     if (props.isNew) {
  //       emit('cancelCreate');
  //     } else {
  //       emit('cancelEdit');
  //     }
  //   })
  //   .onCancel(() => {
  //     console.log('Cancel');
  //   })
  //   .onDismiss(() => {
  //     console.log('I am triggered on both OK and Cancel');
  //   });
}
function confirmSave() {
  emit('saveEdit', contactTemp.value);
  isOpenSaveDialog.value = false;
  // $q.dialog({
  //   title: t('detailSaveContactPrompt'),
  //   cancel: t('detailCancelButton'),
  //   persistent: true,
  //   ok: t('detailSaveButton'),
  // })
  //   .onOk((data) => {
  //     saveContact();
  //   })
  //   .onCancel(() => {
  //     console.log('Cancel');
  //   })
  //   .onDismiss(() => {
  //     console.log('I am triggered on both OK and Cancel');
  //   });
}

onMounted(() => {
  // contactTemp.value = props.contact;
});
</script>

<template>
  <div class="column full-width">
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[0]') }}</div>
      <div class="">{{ contact.id }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[1]') }}</div>
      <div>{{ contact.first_name }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[2]') }}</div>
      <div>{{ contact.last_name }}</div>
    </div>
    <div class="row " v-if="contact.company">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[3]') }}</div>
      <div>{{ contact.company ? contact.company.name : '' }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[4]') }}</div>
      <div>{{ contact.address }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[5]') }}</div>
      <div>{{ contact.phone }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[6]') }}</div>
      <div>{{ contact.email }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[7]') }}</div>
      <div>{{ contact.emergency_name }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[8]') }}</div>
      <div>{{ contact.emergency_phone }}</div>
    </div>
    <div class="row ">
      <div class="col-4 text-weight-bold">{{ $t('listLabels[9]') }}</div>
      <div>{{ contact.supervisor && contact.supervisor.contact ? `${contact.supervisor.contact.first_name} ${contact.supervisor.contact.last_name}` : '' }}</div>
    </div>
    <!-- <div class="row no-wrap justify-evenly q-pt-md">
      <q-btn
        color="primary"
        :label="$t('detailEditButton')"
        @click="editContact"
        class="cus-btn"
      />
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { Contact } from './models';

interface Props {
  contact: Contact;
}
const props = defineProps<Props>();
// const emit = defineEmits<{
//   (e: 'editContact', contact: Contact): void;
// }>();

// function editContact() {
//   emit('editContact', props.contact);
// }
</script>

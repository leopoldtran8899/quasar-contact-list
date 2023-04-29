<template>
  <q-page padding class="row justify-center">
    <!-- staff loaded -->
    <div v-if="contact" class="column justify-start col-10 col-md-8 col-lg-4">
      <ContactDetail :contact="contact" />
      <div class="q-mt-lg row justify-evenly">
        <q-btn color="primary"> External Link</q-btn>
        <q-btn color="primary"> External Link</q-btn>
        <q-btn color="primary"> External Link</q-btn>
        <q-btn color="primary"> External Link</q-btn>
      </div>
    </div>
    <!-- cannot load staff info -->
    <div v-else-if="loading"></div>
    <div v-else>{{ $t('detailLoadingError') }}</div>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { api } from 'boot/axios';
// import { useI18n } from 'vue-i18n';
// import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import ContactDetail from 'components/ContactDetail.vue';
import { Contact } from 'components/models';
import ContactService from 'src/services/ContactService';
// import { useAuthStore } from 'src/stores/auth';
// const { t } = useI18n();
// const $q = useQuasar();
const route = useRoute();
// const router = useRouter();
const contact = ref<Contact>();
const loading = ref<boolean>(false);
// const authStore = useAuthStore();

async function loadData(id: number) {
  loading.value = true;
  const token = JSON.parse(localStorage.getItem('userToken'));
  const res = await ContactService.getContact(token, id);
  if (res && res.contact) {
    contact.value = res.contact;
    loading.value = false;
  } else {
    // $q.notify({
    //     color: 'negative',
    //     position: 'top',
    //     message: 'Loading failed',
    //     icon: 'report_problem',
    //   });
  }
  // await ContactService
  //   .getContact(`/staffs/${id}`)
  //   .then((response: { data: Contact }) => {
  //     staff.value = response.data;
  //   })
  //   .catch(() => {
  //     $q.notify({
  //       color: 'negative',
  //       position: 'top',
  //       message: 'Loading failed',
  //       icon: 'report_problem',
  //     });
  //   })
  //   .finally(() => {
  //     loading.value = false;
  //   });
}

onMounted(() => {
  loadData(Number(route.params.id));
  // console.log(route.params.id);
});
</script>
<style lang="sass">
.note-list
  max-height: 50vh

.contact
  min-width: 70vw
</style>

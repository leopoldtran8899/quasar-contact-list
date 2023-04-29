<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated reveal>
      <q-toolbar>
        <q-toolbar-title>
          <!-- {{ $t('appName').toUpperCase() }} -->
          <router-link to="/">
            <q-btn
              flat
              color="white"
              :label="$t('appName').toUpperCase()"
              size="lg"
            />
          </router-link>
        </q-toolbar-title>
        <!-- TODO Take username from login data -->
        <q-btn-dropdown :label="name" dropdown-icon="settings" unelevated>
          <q-list>
            <!-- TODO Add function to user menu -->
            <q-item clickable v-close-popup @click="myDetail()">
              <q-item-section>
                <q-item-label>{{ $t('layoutUserMenuOption[0]') }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>
                <q-item-label>{{ $t('layoutUserMenuOption[1]') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="route.path" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const name = computed(() => {
  if (authStore.getUser && authStore.getUser.contact) {
    const userContact = authStore.getUser.contact
    return `${userContact.first_name} ${userContact.last_name}`;
  } else {
    return '';
  }
});
// TODO: for Dev only, remove later
function myDetail() {
  if (authStore.getUser && authStore.getUser.contact) {
    const contactId = authStore.getUser.contact.id;
    router.push(`/contacts/${contactId}`);
  }
}
function logout() {
  // TODO: confirmation dialog
  authStore.logout();
  router.push('/login');
}
</script>

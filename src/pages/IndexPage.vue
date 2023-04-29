<template>
  <q-page padding no-scroll>
    <div class="full-width">
      <q-tabs
        v-model="tab"
        style="margin: 0px 16px"
        align="left"
        class="text-primary"
      >
        <q-tab name="list" :label="$t('appName')" />
        <q-tab
          name="detail"
          v-if="selectedContact"
          :label="`${selectedContact.first_name} ${selectedContact.last_name}`"
        />
        <q-tab name="new" v-if="creating" :label="$t('listNewContactTab')" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="list">
          <div class="full-width row justify-between q-gutter-y-sm">
            <q-select
              class="select-options col-12 col-md-3"
              standout="bg-primary text-white"
              v-model="group"
              :options="contactStore.getGroups"
              option-label="name"
              :label="$t('listGroupLabel')"
              @update:model-value="onUpdateGroupSelection"
            >
              <template v-if="group" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="
                    () => {
                      group = undefined;
                      companies = [];
                    }
                  "
                  class="cursor-pointer"
                />
              </template>
            </q-select>
            <q-select
              :disable="!group"
              standout="bg-primary text-white"
              v-model="companies"
              multiple
              :options="companyOptions"
              option-label="name"
              :label="$t('listCompanyLabel')"
              class="select-options col-12 col-md-3"
            />
            <q-input
              standout="bg-primary text-white"
              v-model="searchText"
              :label="$t('listSearchLabel')"
              class="select-options col-12 col-md-5"
              clearable
              clear-icon="close"
            />
            <!-- <q-btn
              color="primary"
              :label="$t('listSearchButton')"
              class="select-options"
              icon="search"
            /> -->
          </div>
          <!-- <div
            class="full-width q-my-md row justify-evenly"
            v-if="canCreateContact"
          >
            <q-btn
              color="primary"
              :label="$t('listNewContact')"
              @click="createNewContact(true, 'new')"
              class="cus-btn"
              icon="add"
            />
          </div> -->
          <!-- List -->
          <ContactTable
            :contacts="contactStore.getContacts"
            :loading="tableLoading"
            :columns="columns"
            :visibleColumnOption="visibleColumns"
            :filter="tableFilter"
            :filterMethod="tableFilterMethod"
            @on-row-click="goToContactDetail"
            class="q-mt-md"
          />
        </q-tab-panel>
        <q-tab-panel name="detail" v-if="selectedContact">
          <q-card class="q-pa-md">
            <q-card-section>
              <q-splitter
                v-model="splitterModel"
                style="height: 100%"
                :horizontal="$q.screen.lt.md"
              >
                <template v-slot:before>
                  <q-tabs v-model="detailTab" :vertical="!$q.screen.lt.md">
                    <q-tab name="detail" icon="person" label="Details" />
                    <q-tab name="notes" icon="list" label="Notes" />
                  </q-tabs>
                </template>

                <template v-slot:after>
                  <q-tab-panels
                    v-model="detailTab"
                    animated
                    no-scroll
                    vertical
                    transition-prev="jump-up"
                    transition-next="jump-up"
                  >
                    <q-tab-panel name="detail">
                      <ContactEdit
                        v-if="editing"
                        :contact="selectedContact"
                        :is-new="false"
                        :companyOptions="selectableCompanies"
                        @cancel-edit="editContact(false)"
                        @save-edit="saveContact"
                      />
                      <ContactDetail v-else :contact="selectedContact" />
                      <div
                        class="full-width q-my-md row justify-evenly"
                        v-if="!editing"
                      >
                        <!-- <q-btn
                          v-if="editing"
                          :label="$t('detailCancelButton')"
                          @click="editContact(false)"
                          class="cus-btn"
                        /> -->
                        <q-btn
                          :label="$t('detailCloseButton')"
                          @click="closeDetail"
                          class="cus-btn"
                        />
                        <!-- <q-btn
                          color="primary"
                          :label="$t('detailEditButton')"
                          @click="editContact(true)"
                          class="cus-btn"
                          v-if="selectedContact.editable"
                        /> -->
                        <!-- <q-btn
                          v-if="editing"
                          color="primary"
                          :label="$t('detailSaveButton')"
                          @click="saveContact()"
                          class="cus-btn"
                        /> -->
                      </div>
                    </q-tab-panel>

                    <q-tab-panel name="notes">
                      <NoteList :notes="notes" @delete-note="deleteNote" />
                      <div class="full-width q-my-md row justify-evenly">
                        <q-btn
                          :label="$t('detailCloseButton')"
                          @click="closeDetail"
                          class="cus-btn"
                        />
                        <q-btn
                          color="primary"
                          :label="$t('detailNewNote')"
                          @click="isOpenNewNoteDialog = true"
                          class="cus-btn"
                        />
                      </div>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <!-- <q-tab-panel name="new" v-if="creating">
          <q-card>
            <q-card-section>
              <ContactEdit
                :contact="newContact"
                :is-new="true"
                :companyOptions="selectableCompanies"
                @cancel-create="createNewContact(false, 'list')"
                @save-edit="saveContact"
              />
            </q-card-section>
          </q-card>
        </q-tab-panel> -->
      </q-tab-panels>
    </div>
    <InputDialog
      :is-shown="isOpenNewNoteDialog"
      :title="$t('detailNewNote')"
      :confirm-message="$t('detailCreateNotePrompt')"
      @cancel="isOpenNewNoteDialog = false"
      @save="createNote"
    />
  </q-page>
</template>
<script setup lang="ts">
import { columns, visibleColumns } from 'components/contact-table-config';
import { ref, computed, onMounted, compile, onUpdated, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  QBtn,
  QCard,
  QCardSection,
  QInput,
  QPage,
  QSelect,
  QSplitter,
  QTab,
  QTabPanel,
  QTabPanels,
  QTabs,
  useQuasar,
  QSpinnerGears,
} from 'quasar';
// import { useRoute, useRouter } from 'vue-router';
import { Contact, Note, Group, Company } from 'components/models';
import UserService from '../services/UserService';
// import AuthService from '../services/AuthService';
import ContactService from '../services/ContactService';
import { useAuthStore } from '../stores/auth';
import { useContactStore } from '../stores/contact';
// import notes from '../data/notes';
//
import ContactTable from 'components/ContactTable.vue';
import ContactDetail from 'components/ContactDetail.vue';
import ContactEdit from 'components/ContactEdit.vue';
import NoteList from 'components/NoteList.vue';
import InputDialog from 'src/components/InputDialog.vue';

const authStore = useAuthStore();
const contactStore = useContactStore();

const tab = ref<string>('list');
const detailTab = ref<string>('detail');
const splitterModel = ref<number>(10);

const { t } = useI18n();
const $q = useQuasar();
// const router = useRouter();
// const staffs = ref<Array<Contact>>([]);
const tableLoading = ref<boolean>(false); // Loading indicator for staff table
const loading = ref<boolean>(false); // Loading indicator for page (Redundant when using plugin for loading)
// const columnOptions = columns.filter((c) => c.required !== true);

const companies = ref<Array<Company>>([]); // Selected companies
const group = ref<Group>(); // Selected group
const searchText = ref<string>(); // Search terms
// const companyList = ref<Array<Company>>([]); //All companies
const companyOptions = computed(() => {
  // Company option based on selected group
  if (group.value) {
    // return contactStore.getCompanies.filter(
    //   (c) => group.value && c.group_id === group.value.id
    // );
    return group.value.companies;
  }
  return [];
});
// const groupOptions = ref<Array<Group>>(); // All groups
const selectableCompanies = ref<Array<Company>>([]); // For edit staff infor, based on user role and company/group
const selectedContact = ref<Contact | null>();
const draftNote = ref<string>('');
const editing = ref<boolean>(false); // Editing mode
const creating = ref<boolean>(false); //Creating mode

const notes = ref<Array<Note>>([]);
const isOpenNewNoteDialog = ref<boolean>(false);

const tableFilter = computed(() => {
  return {
    search: searchText.value,
    group: group.value,
    companies: companies.value,
  };
});

function tableFilterMethod(
  rows: Contact[],
  terms: { search: string; group: { id: number }; companies: Company[] }
) {
  let search = terms.search ? terms.search.toLowerCase() : '';
  let groupId = terms.group ? terms.group.id : 0;
  let companyIds = terms.companies
    ? terms.companies.map((c: Company) => c.id)
    : [];
  console.log('Filter conditions ' + search + ' ' + groupId);
  console.log(companyIds);
  return rows.filter((row: Contact) => {
    if (search) {
      // Return matched names from the whole table
      const c =
        String(row.first_name.toLowerCase()).includes(search) ||
        String(row.last_name.toLowerCase()).includes(search);
      console.log('Search Text get' + c);
      return c;
    }
    if (groupId) {
      let c1 = row.company ? row.company.group_id === groupId : false;
      if (companyIds.length > 0) {
        let c2 = row.company ? companyIds.includes(row.company.id) : false
        console.log('Both ' + c1 + ' ' + c2);
        return c1 && c2;
      } else {
        console.log('Group');
        return c1;
      }
    } else {
      return true;
    }
  });
}
function goToContactDetail(row: Contact) {
  // router.push(`/contacts/${row.id}`);
  selectedContact.value = row;
  resetUIState();
}
function resetUIState() {
  editing.value = false;
  detailTab.value = 'detail';
  tab.value = 'detail';
}
function resetUIStateAfterCreate(id: number) {
  editing.value = false;
  creating.value = false;
  detailTab.value = 'detail';
  selectedContact.value = contactStore.getContacts.find((s) => s.id === id);
  tab.value = 'detail';
}
function closeDetail() {
  editing.value = false;
  detailTab.value = 'detail';
  tab.value = 'list';
  selectedContact.value = null;
}

function onUpdateGroupSelection(value: string) {
  companies.value = [];
  return value;
}

function editContact(isEditting: boolean) {
  editing.value = isEditting;
}
async function saveContact(newContact: Contact) {
  // TODO: handle else case when save staff
  // console.log(newContact);
  if (authStore.getToken) {
    $q.loading.show({
      message: t('listLoadingSaving'),
      spinner: QSpinnerGears,
    });
    const res = editing.value
      ? await ContactService.editContact(authStore.getToken, newContact)
      : await ContactService.newContact(authStore.getToken, newContact);
    if (!res) {
      $q.loading.hide();
      $q.dialog({
        title: t('detailGeneralError'),
      });
    } else {
      await loadData(authStore.getToken);
      resetUIStateAfterCreate(res.id); //FIXME: this will cause error if reload table data slow
      // if (editing.value) {
      //   resetUIState();
      // } else {
      // }
      $q.loading.hide();
    }
  }
}

// New note

// function newNote() {
//   $q.dialog({
//     title: t('detailNewNote'),
//     prompt: {
//       model: '',
//       type: 'textarea',
//     },
//     cancel: true,
//     persistent: true,
//     ok: t('detailSaveButton'),
//   })
//     .onOk((data) => {
//       createNote(data);
//       console.log('>>>> OK, received', data);
//     })
//     .onCancel(() => {
//       console.log('>>>> Cancel');
//       draftNote.value = '';
//     })
//     .onDismiss(() => {
//       console.log('I am triggered on both OK and Cancel');
//     });
// }
// function createNewContact(isCreating: boolean, goToTab: string) {
//   tab.value = goToTab;
//   creating.value = isCreating;
// }

async function createNote(data: string) {
  console.log('create new note ' + data);
  if (authStore.getToken && selectedContact.value) {
    $q.loading.show({
      message: t('listLoadingSaving'),
      spinner: QSpinnerGears,
    });
    const res = await ContactService.createNote(
      authStore.getToken,
      selectedContact.value.id,
      data
    );
    if (res) {
      isOpenNewNoteDialog.value = false;
      console.log('note created: ' + res.note);
      loadNotes();
      draftNote.value = '';
      $q.loading.hide();
    } else {
      $q.loading.hide();
      $q.dialog({
        title: t('detailGeneralError'),
      });
    }
  }
}
async function deleteNote(noteId: number) {
  if (authStore.getToken) {
    $q.loading.show({
      message: t('listLoadingSaving'),
      spinner: QSpinnerGears,
    });
    const res = await ContactService.deleteNote(authStore.getToken, noteId);
    if (res) {
      loadNotes();
      console.log('Delete note OK');
      $q.loading.hide();
      return;
    }
  }
  $q.loading.hide();
  $q.dialog({
    title: t('detailGeneralError'),
  });
}
// watch(
//   () => authStore.getRole,
//   () => {
//     const role = authStore.getRole;
//     if (role > 0) {
//       loadData();
//     }
//   }
// );
watch(
  () => selectedContact.value,
  async () => {
    if (selectedContact.value) {
      loadNotes();
    }
  }
);
function setupToken() {
  // TODO Fix this > || ''
  if (!authStore.getToken) {
    const token = localStorage.getItem('userToken');
    authStore.setToken(JSON.parse(token || ''));
  }
  return authStore.getToken;
}
async function loadData(token: string) {
  tableLoading.value = true;
  const res = await ContactService.getContacts(token);
  if (res) {
    // staffs.value = res.staffs;
    contactStore.setContacts(res.contacts);
    tableLoading.value = false;
  } else {
    tableLoading.value = false;
    console.log('Load staffs failed');
  }
}
async function loadOptions(token: string) {
  // groupOptions.value = await ContactService.getAllGroups(token);
  const gs = await ContactService.getAllGroups(token);
  contactStore.setGroups(gs.groups);
  // companyList.value = await ContactService.getAllCompanies(token);
  // const cs = await ContactService.getAllCompanies(token);
  // contactStore.setCompanies(cs);
  // selectableCompanies.value = await ContactService.getCompaniesByGroup(token);
}
async function loadUser(token: string) {
  loading.value = true;
  $q.loading.show({
    message: t('listLoadingUser'),
    spinner: QSpinnerGears,
  });
  const user = await UserService.getUser(token);
  authStore.setUser(user);
  // canCreateContact.value = await UserService.checkCreateContactPermission(
  //   token
  // );
  // authStore.setCanCreateContact(canCreateContact.value);
  if (user) {
    loading.value = false;
    $q.loading.hide();
  } else {
    loading.value = false;
    console.log('Load user failed');
    $q.loading.hide();
  }
}

async function loadNotes() {
  notes.value = await ContactService.getNotesByContactFromUser(
    authStore.getToken,
    selectedContact.value ? selectedContact.value.id : 0
  );
}

onMounted(async () => {
  const token = setupToken();
  if (!authStore.getContact) {
    await loadUser(token);
  }
  if (!contactStore.getContacts || contactStore.getContacts.length < 1) {
    await loadData(token);
  }
  if (!contactStore.getGroups || contactStore.getGroups.length < 1) {
    await loadOptions(token);
  }
  // if (res) {
  //   loadData();
  //   await authStore.getOptions();
  // } else {
  //   // TODO: what to do when cannot load user
  // }
});
onUpdated(async () => {
  // companyOptions.values = authStore.getCompanyOptions
});
</script>
<style lang="sass">
.search-input
  width: 100%



.filter-option
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  align-items: stretch
  column-gap: 1vw
  margin-bottom: 16px
  label
    flex-basis: 20vw

  label:nth-child(3)
    flex-grow: 4
  button
    flex-shrink: 1
</style>

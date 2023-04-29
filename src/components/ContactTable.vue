<template>
  <q-table
    title="Contact"
    :rows="contacts"
    :columns="columns"
    row-key="id"
    :visible-columns="visibleColumns"
    :pagination="initialPagination"
    :fullscreen="fullscreen"
    :loading="loading"
    :filter="filter"
    :filter-method="filterMethod"
    class="contact-table"
    @row-click="onRowClick"
  >
    <template v-slot:top-left>
      <q-select
        v-model="visibleColumns"
        multiple
        outlined
        dense
        options-dense
        :display-value="$t('listTableOptionLabel')"
        emit-value
        map-options
        :options="columnOptions"
        option-value="name"
        options-cover
        style="min-width: 150px"
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label>{{ opt.label }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                :model-value="selected"
                @update:model-value="toggleOption(opt)"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </template>
    <template v-slot:top-right>
      <q-btn dense flat icon="fullscreen" @click="fullscreen = !fullscreen" />
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTable, QSelect, QItem, QItemSection, QItemLabel, QToggle, QBtn } from 'quasar';
import { onMounted, onUpdated, ref } from 'vue';

import { useI18n } from 'vue-i18n';
import { columns } from './contact-table-config';
// import { useQuasar } from 'quasar';
// import { useRoute, useRouter } from 'vue-router';
import { Contact } from './models';
const { t } = useI18n();
// Refs
// Table settings
const initialPagination = {
  rowsPerPage: 10,
};
const fullscreen = ref<boolean>(false);
// const tableWidth = computed(() => {
//   return fullscreen.value ? '100vw' : '90vw';
// });

// Props
interface Props {
  contacts: Array<Contact>;
  loading: boolean;
  columns: Array<{
    name: string;
    required: boolean;
    label: string;
    align: string;
    field: (row: Contact) => number;
    format: (val: unknown) => string;
    sortable: boolean;
  }>;
  visibleColumnOption: Array<string>;
  filter: unknown;
  filterMethod: unknown;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'onRowClick', row: Contact): void;
}>();
// Refs based on props
const visibleColumns = ref<Array<string>>(props.visibleColumnOption);
const columnOptions = props.columns.filter((c) => c.required !== true);

/* Functions */
function onRowClick(e: unknown, row: Contact) {
  emit('onRowClick', row)
}
onUpdated(() => {
  console.log(props.filter)
})
</script>

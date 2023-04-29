<template>
  <q-list separator>
    <!-- <q-item-label header class="sub-title">{{$t('listLabels[12]')}}</q-item-label> -->
    <q-item v-for="note in notes" :key="note.id">
      <q-item-section>
        <q-item-label>{{ note.note }}</q-item-label>
        <q-item-label caption lines="1"
          >{{ $t('detailBy') }} <b>{{ note.creator && note.creator.contact ? note.creator.contact.first_name : '_' }}</b>
          {{ $t('detailAt') }}
          <em>{{ new Date(note.updated_at).toDateString() }}</em></q-item-label
        >
      </q-item-section>
      <q-item-section side top>
        <q-btn
          @click="onConfirmDelete(note.id)"
          size="10px"
          rounded
          color="warning"
          icon="delete"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { Note } from './models';
const { t } = useI18n();
const $q = useQuasar();
interface Props {
  notes: Array<Note>;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  // (e: 'newNote'): void;
  (e: 'deleteNote', id: number): void;
}>();

// Functions
// function newNote() {
//   emit('newNote');
// }

function onConfirmDelete(noteId: number) {
  $q.dialog({
    title: t('detailDeleteNotePrompt'),
    cancel: t('detailNo'),
    persistent: true,
    ok: t('detailYes'),
  })
    .onOk(() => {
      emit('deleteNote', noteId);
    })
    .onCancel(() => {
      console.log('Cancel');
    })
    .onDismiss(() => {
      console.log('I am triggered on both OK and Cancel');
    });
}
</script>

<template>
  <q-dialog v-model="isOpenDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="userInput"
          autofocus
          type="textarea"
          ref="input"
          :rules="[
            (val) =>
              InputValidator.required(val) || $t('inputValidation.required'),
            (val, rules) =>
              InputValidator.textMax500(val) ||
              $t('inputValidation.limitText500'),
          ]"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('detailCancelButton')" @click="emit('cancel')" />
        <q-btn
          flat
          :label="$t('detailSaveButton')"
          @click="isOpenConfirmDialog = true"
          :disable="!userInput"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isOpenConfirmDialog" persistent>
    <q-card class="">
      <q-card-section>
        <div class="text-h6">{{ props.confirmMessage }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('detailCancelButton')" @click="isOpenConfirmDialog = false" />
        <q-btn flat :label="$t('detailSaveButton')" @click="confirmSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useQuasar } from 'quasar';
import InputValidator from './validation-rules';
const { t } = useI18n();
// const $q = useQuasar();
interface Props {
  isShown: boolean;
  title: string;
  confirmMessage: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'save', inputContent: string): void;
  (e: 'cancel'): void;
}>();
const userInput = ref<string>('');
const isOpenConfirmDialog = ref<boolean>(false);
const isOpenDialog = computed(() => props.isShown);

function confirmSave() {
  isOpenConfirmDialog.value = false;
  emit('save', userInput.value);
  userInput.value = '';
}
</script>

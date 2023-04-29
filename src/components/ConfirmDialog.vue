<template>
  <q-dialog v-model="isOpenDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="props.message">
        <div>{{ props.message }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('detailCancelButton')" @click="emit('cancel')" />
        <q-btn flat :label="$t('detailYes')" @click="emit('yes')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { useI18n } from 'vue-i18n';
// import { useQuasar } from 'quasar';
// const { t } = useI18n();
// const $q = useQuasar();
interface Props {
  isShown: boolean;
  title: string;
  message?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'yes'): void;
  (e: 'cancel'): void;
}>();

const isOpenDialog = computed(() => props.isShown);
</script>

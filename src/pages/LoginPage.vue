<template>
  <form
    class="absolute-full row justify-center items-center content-center"
    @submit.prevent="login"
  >
    <q-card class="col-10 col-sm-6 col-md-4 login-box flex column">
      <!-- Title -->
      <div class="login-box-section title">
        {{ $t('loginTitleText') }}
      </div>
      <!-- usename & password input text -->
      <div class="login-box-section">
        <q-input
          outlined
          v-model="email"
          :label="$t('loginEmailText')"
          :rules="[(val:string) => !!val || $t('loginEmailText') + $t('loginEmptyWarningText')]"
        />
        <q-input
          v-model="password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          :label="$t('loginPasswordText')"
          :rules="[(val:string) => !!val || $t('loginPasswordText') + $t('loginEmptyWarningText')]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <!-- Links -->
      <div class="login-box-section">
        <a>{{ $t('loginForgotText') }}</a>
      </div>
      <!-- Buttons -->
      <div class="login-box-section">
        <q-btn
          color="primary"
          :label="$t('loginTitleText')"
          :disable="!(email && password)"
          size="md"
          type="submit"
        />
      </div>
    </q-card>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref<string>('');
const password = ref<string>('');
const isPwd = ref<boolean>(true);
const authStore = useAuthStore();

const login = async (): Promise<void> => {
  // TODO: Implement Login function
  if (email.value && password.value) {
    // emit('login', email, password)
    const token = await AuthService.login(email.value, password.value)
    if(token) {
      authStore.setToken(token)
      console.log('Login sucess ' + token)
      router.push('/')
    } else {
      console.log('Login failed');
      // TODO Add noti fail login
    }
    // authStore.login(loginRes)
  } else {
    console.log('Not provided usename and password');
  }
};
</script>
<style>
.login-box {
  padding: 2rem;
}
.login-box-section {
  margin: 1rem 0rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.8rem;
}
.title {
  font-size: 2rem;
  text-align: center;
}
</style>

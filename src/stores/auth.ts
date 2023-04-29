import { defineStore } from 'pinia';
// import { login } from '../services/AuthService';
// import { getUser, getUserOptions } from '../services/UserService';
import { User } from 'src/components/models';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    // role: 0 as number | null,
    token: null as string | null,
    // companies: [] as Company[] | null,
  }),

  getters: {
    // getUsername(state) {
    //   return state.username;
    // },
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
  },

  actions: {
    // login(username: string, password: string) {
    //   if (token) {
    //     localStorage.setItem('userToken', JSON.stringify(token));
    //     this.token = token;
    //     this.getUser();
    //     return true;
    //   } else {
    //     console.log('Login error');
    //     return false;
    //   }
    //   // const token = await AuthService.login(username, password);
    //   // console.log('Token: ' + token);
    //   // localStorage.setItem('user', token || '');
    //   // return this.getUser();
    // },
    setToken(token: string) {
      this.token = token
      localStorage.setItem('userToken', JSON.stringify(token));
    },
    setUser(user: User) {
      // this.username = username
      this.user = user
    },
    logout() {
      localStorage.removeItem('userToken');
      this.resetUser();
    },
    resetUser() {
      // this.username = '';
      this.user = null;
      // this.role = 0;
      this.token = '';
      // this.companies = [];
    },
  },
});

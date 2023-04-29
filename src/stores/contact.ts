import { defineStore } from 'pinia';
import { Company, Group, Contact } from 'src/components/models';

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [] as Contact[] | [],
    companies: [] as Company[],
    groups: [] as Group[],
  }),

  getters: {
    getContacts (state) {
      return state.contacts
    },
    getGroups (state) {
      return state.groups
    },
    getCompanies (state) {
      return state.companies
    }
  },

  actions: {
    setContacts (contacts: Array<Contact>) {
      this.contacts = contacts
    },
    setGroups(groups: Array<Group>){
      this.groups = groups
    },
    setCompanies(companies: Array<Company>){
      this.companies = companies
    }
  }
});

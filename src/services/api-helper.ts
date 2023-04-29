export const urls = {
  login: '/auth/login',
  logout: '/auth/logout',
  user: '/auth/user',
  getContacts: '/contacts',
  getContactById: '/contacts/',
  editContactById: '/contacts/',
  getCompanies: '/companies',
  getGroupCompanies: '/group-companies',
  getGroups: '/groups',
  getNotesByContact: '/notes/{staff_id}',
  verify: '/auth/verify',
  getCompaniesByGroup: (group_id: number) => `/groups/${group_id}/companies`,
  getNotesByContactFromUser: '/notes-by-contact/',
  notes: '/notes/',
  createNote:'/note/'
}


export const BearerHeader = (token: string): object => ({
  headers: {
    Authorization: 'Bearer ' + token,
  },
})
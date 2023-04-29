import { Contact } from 'src/components/models';
import { api } from '../boot/axios';
import { urls, BearerHeader } from './api-helper';
class ContactListService {
  /**
   * Get all contacts viewable by user
   * @param token
   * @returns Array of Contact
   */
  async getContacts(token: string) {
    return await api
      .get(urls.getContacts, BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getContacts');
        console.log(err);
        return null;
      });
  }

  /**
   * Edit contact
   * @param token
   * @param contact
   * @returns
   */
  async editContact(token: string, contact: Contact) {
    const putContact = contact;
    return await api
      .put(urls.editContactById + contact.id, putContact, BearerHeader(token))
      .then((res) => {
        console.log('editContact---->');
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:editContact');
        console.log(err);
        return null;
      });
  }

  async getContact(token: string, id: number) {
    return await api
      .get(urls.getContactById + id, BearerHeader(token))
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getContact');
        console.log(err);
        return null;
      });
  }

  /**
   * Create new Contact
   * @param token
   * @param contact
   * @returns
   */
  async newContact(token: string, contact: Contact) {
    const putContact = contact;
    return await api
      .post(urls.editContactById, putContact, BearerHeader(token))
      .then((res) => {
        console.log('newContact---->');
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:newContact');
        console.log(err);
        return null;
      });
  }

  /**
   * Get all companies
   * @param token
   * @returns
   */
  async getAllCompanies(token: string) {
    return await api
      .get(urls.getCompanies, BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getCompanies');
        console.log(err);
        return null;
      });
  }

  /**
   * Get all groups
   * @param token
   * @returns
   */
  async getAllGroups(token: string) {
    return await api
      .get(urls.getGroups, BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getGroups');
        console.log(err);
        return null;
      });
  }

  /**
   * Get companies  by group id
   * @param token
   * @returns
   */
  async getCompaniesByGroup(token: string, groupId: number) {
    return await api
      .get(urls.getCompaniesByGroup(groupId), BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getCompaniesByGroup');
        console.log(err);
        return null;
      });
  }

  /**
   * Get note by user -> creator Id and contact_id
   * @param token
   * @param creator_id
   * @param contact_id
   * @returns
   */
  async getNotesByContactFromUser(
    token: string,
    contact_id: number
  ) {
    return await api
      .get(urls.getNotesByContactFromUser + contact_id, {
        ...BearerHeader(token),
        // params: params,
      })
      .then((res) => {
        return res.data.notes;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:getNotesByContactFromUser');
        console.log(err);
        return null;
      });
  }

  async createNote(
    token: string,
    contact_id: number,
    note: string
  ) {
    const params = {
      contact_id: contact_id,
      note: note,
    };
    return await api
      .post(urls.createNote, params, BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:createNote');
        console.log(err);
        return null;
      });
  }
  async deleteNote(token: string, note_id: number) {
    return await api
      .delete(urls.notes + note_id, BearerHeader(token))
      .then((res) => {
        if (res.data) {
          console.log('contactsevice: delete ' + note_id);
          return res.data;
        }
        return false;
      })
      .catch((err) => {
        console.log('ERROR: ContactService:deleteNote');
        console.log(err);
        return null;
      });
  }
}
const contactService = new ContactListService();
export default contactService;

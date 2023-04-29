import { api } from '../boot/axios';
import { urls, BearerHeader } from './api-helper';

class UserService {
  /**
   * Get logged in user info
   *
   * @param token access token
   * @returns user infor
   */
  async getUser(token: string) {
    return await api
      .get(urls.user, BearerHeader(token))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('ERROR: UserService:getUser');
        console.log(err);
        return null;
      });
  }

}

const userService = new UserService();
export default userService;
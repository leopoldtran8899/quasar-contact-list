import { api } from '../boot/axios';
import { urls, BearerHeader } from './api-helper';

class AuthService {
  /**
   * Login function
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string): Promise<string> {
    return await api
      .post(urls.login, {
        email: email,
        password: password, //TODO: Encript this
      })
      .then((response) => {
        if (response.data.token) {
          return response.data.token;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log('ERROR: AuthService:login');
        console.log(err);
        return null;
      });
  }
  /**
   * Verify access token
   * @param token
   * @returns { valid: boolean }
   */
  async verify(token: string): Promise<{ valid: boolean }> {
    return await api
      .get(urls.verify, BearerHeader(token))
      .then((res) => {
        if(res.data.valid) {
          return res.data
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log('ERROR: UserService:verify');
        console.log(err);
        return false;
      });
  }
  /**
   * Logout function
   *
   */
  async logout(): Promise<boolean> {
    return api
      .post(urls.logout)
      .then(() => {
        // TODO: handle logout
        return true;
      })
      .catch((err) => {
        console.log('ERROR: UserService:logout');
        console.log(err);
        return false;
      });
  }
}

const authService = new AuthService();
export default authService;
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import axios from 'axios';
import moment from 'moment';
import refreshTokenLogin from './refreshTokenLoginService';

const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

class ApiService {
  constructor({ url } = {}) {
    this.client = axios.create({
      baseURL: url || `${process.env.API_BASE_URL}`, // use env
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.defineInterceptor();

    METHODS.forEach((method) => {
      this[method] = (targetUrl, body) => {
        return new Promise((resolve, reject) => {
          this.client[method](targetUrl, body)
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              const code =
                error?.response?.data?.code || error?.response?.status;
              console.log(
                `error (URL:${targetUrl} ${
                  method === 'post' && `|| Body) ${body}`
                } =>`,
                error,
              );
              reject(error);
            });
        });
      };
    });
  }

  defineInterceptor() {
    // We're using interceptor to inject the requests with the idToken from amplify
    this.client.interceptors.request.use(async (config) => {
      // if (config === process.env.REACT_APP_BASE_URL) {
      //   // check base URL, to prevent sending credentials to third party url
      // }
      const {
        idToken,
        refreshToken,
        expiredAt: idTokenExpiredDate,
      } = (await getUserTokens()) || {};
      const idTokenAge = moment().diff(moment(idTokenExpiredDate));

      if (
        config.url === '/auth/login' ||
        config.url === '/participant/signup'
      ) {
        return config;
      }

      if (idTokenAge >= 0 && refreshToken) {
        const userTokens = await refreshTokenLogin(refreshToken);
        config.headers.Authorization = userTokens?.idToken;
        config.headers['X-Device-Type'] = Platform.OS;
        return config;
      }

      if (idToken) {
        config.headers.Authorization = idToken;
        config.headers['X-Device-Type'] = Platform.OS;
        return config;
      }

      if (Auth.user) {
        try {
          const currentSession = await Auth.currentSession();
          config.headers.Authorization = `${currentSession.idToken.jwtToken}`;
          config.headers['X-Device-Type'] = Platform.OS;

          return config;
        } catch (error) {
          console.error('axios error', { error });
          return config;
        }
      } else {
        try {
          const currentSession = await Auth.currentAuthenticatedUser();
          config.headers.Authorization = `${currentSession?.signInUserSession?.idToken?.jwtToken}`;
          config.headers['X-Device-Type'] = Platform.OS;

          return config;
        } catch (error) {
          console.error('axios error 2', { error });
          return config;
        }
      }
    });
  }

  async setUserTokens(credentials) {
    await EncryptedStorage.setItem(
      'user_token',
      JSON.stringify({
        idToken: credentials.idToken,
        refreshToken: credentials.refreshToken,
        expiredAt: credentials.expiredAt,
      }),
    );
  }

  async getUserTokens() {
    const session = await EncryptedStorage.getItem('user_token');

    if (session) {
      return JSON.parse(session);
    }
  }

  async removeUserTokens() {
    try {
      const userToken = (await getUserTokens()) || null;
      if (userToken) {
        await EncryptedStorage.removeItem('user_token');
      }
    } catch (error) {
      // console.error('token error', { error });
    }
  }
}

export default ApiService;

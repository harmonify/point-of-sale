import axios from 'axios';
import Config from 'react-native-config';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserTokens } from '@/helpers/encryptedStorage';

const refreshTokenLogin = async (refreshToken) => {
  const body = {
    refreshToken,
    deviceKey: null,
  };

  try {
    const response = await axios.post(
      `${Config.REACT_APP_BASE_URL}/auth/refresh-token`,
      body,
    );
    const { data: userTokens } = response?.data || {};

    await setUserTokens(userTokens);
    return userTokens;
  } catch (error) {
    if (error?.response?.data?.code === 400) {
      AsyncStorage.setItem('isInvalidToken', '1');
      RNRestart.Restart();
    } else {
      // console.error('token API error', { error });
    }
  }
};

export default refreshTokenLogin;

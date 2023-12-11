export default class AuthService {
  static async setUserTokens(credentials) {
    await EncryptedStorage.setItem(
      'user_token',
      JSON.stringify({
        idToken: credentials.idToken,
        refreshToken: credentials.refreshToken,
        expiredAt: credentials.expiredAt,
      }),
    );
  }

  static async getUserTokens() {
    const session = await EncryptedStorage.getItem('user_token');

    if (session) {
      return JSON.parse(session);
    }
  }

  static async removeUserTokens() {
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

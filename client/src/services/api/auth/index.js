import api from '@/services/api';
import { postLogin } from './auth.service';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: postLogin(builder),
  }),
});

export const {
  usePostSendOtpPhoneMutation,
  usePostVerifyOtpPhoneMutation,
  usePostLoginMutation,
} = authApi;

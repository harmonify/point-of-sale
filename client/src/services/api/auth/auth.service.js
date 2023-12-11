export const postLogin = (builder) =>
  builder.mutation({
    query: (data) => ({
      url: '/auth/login',
      method: 'post',
      body: data,
    }),
  });

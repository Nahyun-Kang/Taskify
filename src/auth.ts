import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  //API 라우트
  //API 라우트는 _api와 다르게 브라우저처럼 실제 주소가 된다.
  handlers: { GET, POST },
  auth,
  //로그인 함수
  signIn,
} = NextAuth({
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const csrfRes = await fetch('/api/auth/csrf');
        const { csrfToken } = await csrfRes.json();
        //로그인할 때 호출되는 부분
        const res = await fetch(`${process.env.NEXTAUTH_URL}`, {
          method: 'POST',
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
            csrfToken,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          return null;
        }

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
});

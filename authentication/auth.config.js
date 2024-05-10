export const authConfig = {
  pages: {
    signIn: "/",
  },
  providers: [],
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.id = user.id;
      }
      return token
    },
    async session({session, token}) {
      if(token) {
        session.user.id = token.id;
      }
      return session
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const url = request.nextUrl;

      if ((url.pathname === "/" || url.pathname === "/register") && user) {
        return Response.redirect(new URL('/home', request.url));
      }

      if (user) {
        return true;
      }

      const allowedPaths = ["/", "/register"];
      if (!user && !allowedPaths.includes(url.pathname)) {
        return Response.redirect(new URL('/', request.url));
      }
      return allowedPaths.includes(url.pathname);
    },
  }
}
import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/signin',
    error: '/error',
  }
})

export const config = { matcher: ["/quiz", "/admin", "/history", "/password"] }
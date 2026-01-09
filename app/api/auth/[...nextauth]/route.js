import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../lib/passwordUtils";

let prisma = null;

function getPrisma() {
  if (!prisma) {
    const { PrismaClient } = require("@prisma/client");
    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    }
  }
  return prisma;
}

// NextAuth Database Adapter for Prisma
function PrismaAdapter() {
  return {
    async createUser(user) {
      const prisma = getPrisma();
      return await prisma.user.create({ data: user });
    },

    async getUser(id) {
      const prisma = getPrisma();
      return await prisma.user.findUnique({ where: { id } });
    },

    async getUserByEmail(email) {
      const prisma = getPrisma();
      return await prisma.user.findUnique({ where: { email } });
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const prisma = getPrisma();
      const account = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        include: { user: true },
      });
      return account?.user ?? null;
    },

    async updateUser(user) {
      const prisma = getPrisma();
      return await prisma.user.update({
        where: { id: user.id },
        data: user,
      });
    },

    async deleteUser(userId) {
      const prisma = getPrisma();
      await prisma.user.delete({ where: { id: userId } });
    },

    async linkAccount(account) {
      const prisma = getPrisma();
      return await prisma.account.create({ data: account });
    },

    async unlinkAccount({ provider, providerAccountId }) {
      const prisma = getPrisma();
      return await prisma.account.delete({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      const prisma = getPrisma();
      return await prisma.session.create({
        data: {
          sessionToken,
          userId,
          expires,
        },
      });
    },

    async getSessionAndUser(sessionToken) {
      const prisma = getPrisma();
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });
      return session ? { session, user: session.user } : null;
    },

    async updateSession({ sessionToken, expires }) {
      const prisma = getPrisma();
      return await prisma.session.update({
        where: { sessionToken },
        data: { expires },
      });
    },

    async deleteSession(sessionToken) {
      const prisma = getPrisma();
      await prisma.session.delete({ where: { sessionToken } });
    },

    async createVerificationToken({ identifier, token, expires }) {
      const prisma = getPrisma();
      return await prisma.verificationToken.create({
        data: {
          identifier,
          token,
          expires,
        },
      });
    },

    async useVerificationToken({ identifier, token }) {
      const prisma = getPrisma();
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier,
              token,
            },
          },
        });
        return verificationToken;
      } catch (error) {
        return null;
      }
    },
  };
}

export const authOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user by email
        const prisma = getPrisma();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.password) {
          throw new Error("This account uses OAuth. Please sign in with Google or Facebook");
        }

        // Verify password using bcrypt
        const isPasswordValid = await verifyPassword(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import { prisma } from "./prisma.js";

/**
 * Custom NextAuth Database Adapter for Prisma
 * Handles user, account, session, and email verification token management
 */
export function PrismaAdapter() {
    return {
        async createUser(user) {
            return await prisma.user.create({ data: user });
        },

        async getUser(id) {
            return await prisma.user.findUnique({ where: { id } });
        },

        async getUserByEmail(email) {
            return await prisma.user.findUnique({ where: { email } });
        },

        async getUserByAccount({ provider, providerAccountId }) {
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
            return await prisma.user.update({
                where: { id: user.id },
                data: user,
            });
        },

        async deleteUser(userId) {
            await prisma.user.delete({ where: { id: userId } });
        },

        async linkAccount(account) {
            return await prisma.account.create({ data: account });
        },

        async unlinkAccount({ provider, providerAccountId }) {
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
            return await prisma.session.create({
                data: {
                    sessionToken,
                    userId,
                    expires,
                },
            });
        },

        async getSessionAndUser(sessionToken) {
            const session = await prisma.session.findUnique({
                where: { sessionToken },
                include: { user: true },
            });
            return session ? { session, user: session.user } : null;
        },

        async updateSession({ sessionToken, expires }) {
            return await prisma.session.update({
                where: { sessionToken },
                data: { expires },
            });
        },

        async deleteSession(sessionToken) {
            await prisma.session.delete({ where: { sessionToken } });
        },

        async createVerificationToken({ identifier, token, expires }) {
            return await prisma.verificationToken.create({
                data: {
                    identifier,
                    token,
                    expires,
                },
            });
        },

        async useVerificationToken({ identifier, token }) {
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
                // If token doesn't exist, return null
                return null;
            }
        },
    };
}

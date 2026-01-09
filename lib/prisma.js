import { PrismaClient } from '@prisma/client'

let prismaInstance;

const prisma = {
    user: {
        findUnique: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.user.findUnique(args)
        },
        create: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.user.create(args)
        },
        findMany: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.user.findMany(args)
        },
        update: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.user.update(args)
        },
        delete: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.user.delete(args)
        },
    },
    post: {
        findUnique: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.post.findUnique(args)
        },
        findMany: async (args) => {
            if (!prismaInstance) {
                if (process.env.NODE_ENV === 'production') {
                    prismaInstance = new PrismaClient()
                } else {
                    if (!global.prisma) {
                        global.prisma = new PrismaClient()
                    }
                    prismaInstance = global.prisma
                }
            }
            return prismaInstance.post.findMany(args)
        },
    },
}

export { prisma }
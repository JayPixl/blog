import { prisma } from "./prisma.server"

interface UpdateForm {
    fullName: string
    nickname: string
}

export const updateUserProfile: (
    userId: string,
    form: UpdateForm
) => Promise<{
    error?: string
}> = async (userId, form) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user)
        return {
            error: "Could not find user"
        }

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...form
        }
    })

    return {}
}

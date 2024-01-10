import { createCookieSessionStorage, redirect } from "@remix-run/node"
import { prisma } from "./prisma.server"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import rd from "randomstring"
import { sendVerifyEmail } from "./mail.server"

export const saltRounds: number = 10

const secret = process.env.SESSION_SECRET
if (!secret) {
    throw new Error("SESSION_SECRET is not set")
}

interface LoginForm {
    email: string
    password: string
    redirectTo?: URL | string
}

interface SignupForm extends LoginForm {
    fullName: string
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "jpxldev-session",
        secure: process.env.NODE_ENV === "production",
        secrets: [secret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true
    }
})

export const login: (form: LoginForm) => Promise<{
    error?: string
    fields?: any
    status?: number
    redirectTo?: {
        path: string
        body: any
    }
}> = async form => {
    let match = await prisma.user.findFirst({
        where: {
            email: {
                equals: form.email,
                mode: "insensitive"
            }
        }
    })

    if (!match || !(await bcrypt.compare(form.password, match?.password)))
        return { fields: { ...form }, error: "Email or password is incorrect." }

    return createUserSession(match.id, (form.redirectTo as string) || "/")
}

export const signup: (form: SignupForm) => Promise<{
    error?: string
    fields?: any
    srvFieldErrors?: any
    redirectTo?: {
        path: string
        body: any
    }
    status?: number
}> = async form => {
    const match = await prisma.user.findFirst({
        where: { email: { equals: form.email, mode: "insensitive" } }
    })

    if (match)
        return {
            fields: { ...form },
            srvFieldErrors: { email: "User already exists with that email." }
        }

    const newUser = await createUser(form)

    if (!newUser) {
        return {
            error: "Internal server error while trying to create a new user.",
            status: 500
        }
    }

    return createUserSession(newUser.id, (form.redirectTo as string) || "/")
}

export const createUser: (form: SignupForm) => Promise<any> = async (
    form: SignupForm
) => {
    const passwordHash = await bcrypt.hash(form.password, saltRounds)
    const anonymousNumber = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")
    const verifyCode = rd.generate(128)

    const user = await prisma.user.create({
        data: {
            email: form.email,
            password: passwordHash,
            fullName: form.fullName.length
                ? form.fullName
                : `Anonymous#${anonymousNumber}`,
            verified: false,
            verifyCode,
            anonymousNumber,
            type: "USER"
        }
    })

    return await sendVerifyEmail(form.fullName, form.email, verifyCode, user.id)
}

export const createUserSession: (
    userId: string,
    redirectTo: string
) => Promise<{
    redirectTo: {
        path: string
        body: any
    }
    error: any
}> = async (userId: string, redirectTo: string) => {
    const session = await storage.getSession()
    session.set("userId", userId)
    return {
        redirectTo: {
            path: redirectTo,
            body: {
                headers: {
                    "Set-Cookie": await storage.commitSession(session)
                }
            }
        },
        error: false
    }
}

export const getUserSession: (request: Request) => Promise<any> = async (
    request: Request
) => {
    return await storage.getSession(request.headers.get("Cookie"))
}

export const getUserId: (request: Request) => Promise<{
    error?: string
    userId?: string
}> = async (request: Request) => {
    const session = await getUserSession(request)
    const userId = session.get("userId")
    if (!userId) return { error: "Could not find user id", userId: undefined }
    return { error: undefined, userId }
}

export const getUser: (
    request: Request,
    password?: boolean,
    verifyCode?: boolean
) => Promise<{
    error?: string
    status?: number
    user?: User
}> = async (request, password = false, verifyCode = false) => {
    const { userId } = await getUserId(request)
    if (!userId) return { error: "Invalid User ID", status: 400 }

    let user: User | undefined
    try {
        user = (await prisma.user.findUnique({
            where: { id: userId }
        })) as User
        if (!user) throw redirect("/logout")
    } catch (e) {
        user = undefined
    }

    user = {
        ...user,
        password: password ? user?.password : "hidden",
        verifyCode: verifyCode ? user?.verifyCode : "hidden"
    } as User

    return { user }
}

export const destroyUserSession: (
    request: Request,
    redirectTo?: URLSearchParams
) => Promise<{
    path: string
    body: any
}> = async (request: Request, redirectTo?: URLSearchParams) => {
    const session = await getUserSession(request)
    return {
        path: redirectTo ? `/login?${redirectTo}` : "/login",
        body: {
            headers: {
                "Set-Cookie": await storage.destroySession(session)
            }
        }
    }
}

export const requireUserSession: (
    request: Request,
    redirectTo: string
) => Promise<{
    userId?: string
    redirect?: string
}> = async (
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) => {
    const { error, userId } = await getUserId(request)
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]])

    if (error || !(await prisma.user.findUnique({ where: { id: userId } }))) {
        return { redirect: `/login?${searchParams}`, userId: undefined }
    }

    return { redirect: undefined, userId }
}

export const requireAdmin: (request: Request) => Promise<{
    error?: string
    authorized?: boolean
    user?: User
}> = async (request: Request) => {
    const { user } = await getUser(request)
    if (user?.type === undefined)
        return {
            error: "Could not find security level for this user",
            authorized: false
        }

    if (user?.type === "ADMIN") return { authorized: true, user }
    return {
        error: "User unauthorized",
        authorized: false,
        user
    }
}

export const authenticateAdmin: (
    request: Request,
    password: string
) => Promise<{
    authenticated: boolean
    error?: string
    status?: number
}> = async (request, password) => {
    const { user } = await getUser(request)
    if (!user)
        return {
            authenticated: false,
            error: "Could not find user in database",
            status: 404
        }
    if (password !== process.env.ADMIN_KEY?.toString())
        return { authenticated: false, error: "Unauthorized", status: 401 }

    const result = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            type: "ADMIN"
        }
    })
    return { authenticated: true }
}

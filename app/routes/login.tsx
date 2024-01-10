import { XCircleIcon } from "@heroicons/react/20/solid"
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    json,
    redirect
} from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { SitemapFunction } from "remix-sitemap"
import FancyButton from "~/components/fancy-button"
import FancyForm from "~/components/fancy-form"
import FancyInput from "~/components/fancy-input"
import Layout from "~/components/layout"
import { getUser, login, signup } from "~/utils/users.server"
import {
    validateEmail,
    validateExists,
    validateLength,
    validatePasswordsMatch
} from "~/utils/validators"

export const meta: MetaFunction = () => [
    {
        title: `Login | jpxl.dev blog`
    }
]

export const sitemap: SitemapFunction = () => ({
    priority: 0.5
})

export const loader: LoaderFunction = async ({ request }) => {
    const { user } = await getUser(request)
    if (user) return redirect("/")

    return null
}

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()

    const action = form.get("_action")!
    let fields = {
        email: (form.get("email") as string) || "",
        password: (form.get("password") as string) || "",
        fullName: (form.get("fullName") as string) || "",
        confirmPassword: (form.get("confirmPassword") as string) || ""
    }

    switch (action) {
        case "login": {
            const fieldErrors = {
                email: validateExists(fields.email, "an email"),
                password: validateExists(fields.password, "a password")
            }
            if (Object.values(fieldErrors).some(Boolean)) {
                return json({ fields, fieldErrors })
            } else {
                console.log(
                    `Logging in as ${fields.email} with password ${fields.password}.`
                )
                const { error, redirectTo } = await login({
                    email: fields.email,
                    password: fields.password
                })
                if (error) {
                    return json({ fields, formError: error, action })
                } else {
                    return redirect(redirectTo?.path || "/", {
                        ...redirectTo?.body
                    })
                }
            }
            break
        }
        case "signup": {
            const fieldErrors = {
                email: validateEmail(fields.email),
                password: validateLength(fields.password, 6, 20),
                fullName: fields.fullName
                    ? validateLength(fields.fullName, 1, 20)
                    : false,
                confirmPassword: validatePasswordsMatch(
                    fields.password,
                    fields.confirmPassword
                )
            }
            if (Object.values(fieldErrors).some(Boolean)) {
                return json({ fields, fieldErrors, action })
            } else {
                const { error, srvFieldErrors, redirectTo } = await signup({
                    email: fields.email,
                    fullName: fields.fullName,
                    password: fields.password
                })
                if (
                    error ||
                    (srvFieldErrors &&
                        Object.values(srvFieldErrors).some(Boolean))
                ) {
                    return json({
                        fields,
                        fieldErrors: srvFieldErrors,
                        formError: error,
                        action
                    })
                } else {
                    return redirect(redirectTo?.path || "/", {
                        ...redirectTo?.body
                    })
                }
            }
            break
        }
        default: {
            return json({ fields, formError: "Invalid request type" })
        }
    }
}

export default function Login() {
    const actionData = useActionData<typeof action>()

    const [frmAction, setFrmAction] = useState<"login" | "signup">(
        actionData?.action || "login"
    )
    const [inputs, setInputs] = useState({
        email: actionData?.fields?.email || "",
        fullName: actionData?.fields?.fullName || "",
        password: actionData?.fields?.password || "",
        confirmPassword: actionData?.fields?.confirmPassword || ""
    })
    return (
        <Layout>
            <div className="w-full h-[90vh] flex justify-center items-center">
                <FancyForm>
                    <div className="flex flex-row items-stretch justify-center">
                        <div
                            className={`flex flex-row justify-center items-center py-3 px-6 md:px-6 md:py-4 border-b-4 text-xl md:text-2xl font-semibold hover:border-b-action-600 dark:hover:border-b-action-400 hover:text-action-600 dark:hover:text-action-400 transition-colors cursor-pointer
                            ${
                                frmAction === "login"
                                    ? "border-b-primary-800 dark:border-b-primary-200 text-primary-800 dark:text-primary-200"
                                    : "border-b-primary-500 dark:border-b-primary-400 text-primary-500 dark:text-primary-400"
                            }
                            `}
                            onClick={() => setFrmAction("login")}
                        >
                            Log In
                        </div>
                        <div
                            className={`flex flex-row justify-center items-center py-3 px-6 md:px-6 md:py-4 border-b-4 text-xl md:text-2xl font-semibold hover:border-b-action-600 dark:hover:border-b-action-400 hover:text-action-600 dark:hover:text-action-400 transition-colors cursor-pointer
                            ${
                                frmAction === "signup"
                                    ? "border-b-primary-800 dark:border-b-primary-200 text-primary-800 dark:text-primary-200"
                                    : "border-b-primary-500 dark:border-b-primary-400 text-primary-500 dark:text-primary-400"
                            }
                            `}
                            onClick={() => setFrmAction("signup")}
                        >
                            Sign Up
                        </div>
                    </div>

                    {actionData?.error && (
                        <div className="flex flex-row items-center py-3 font-bold text-lg">
                            <XCircleIcon className="w-5 h-5 text-red-500" />
                            <span>&nbsp;{actionData.formError}</span>
                        </div>
                    )}

                    <FancyInput
                        label={frmAction === "login" ? "Email" : "Email *"}
                        name="email"
                        type="email"
                        value={inputs.email}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                [e.currentTarget.name]: e.target.value
                            })
                        }
                        error={actionData?.fieldErrors?.email}
                    />
                    {frmAction === "signup" && (
                        <>
                            <FancyInput
                                label="Full Name"
                                name="fullName"
                                type="text"
                                value={inputs.fullName}
                                onChange={e =>
                                    setInputs({
                                        ...inputs,
                                        [e.currentTarget.name]: e.target.value
                                    })
                                }
                                error={actionData?.fieldErrors?.fullName}
                            />
                        </>
                    )}
                    <FancyInput
                        label={
                            frmAction === "login" ? "Password" : "Password *"
                        }
                        name="password"
                        type="password"
                        value={inputs.password}
                        onChange={e =>
                            setInputs({
                                ...inputs,
                                [e.currentTarget.name]: e.target.value
                            })
                        }
                        error={actionData?.fieldErrors?.password}
                    />
                    {frmAction === "signup" && (
                        <>
                            <FancyInput
                                label="Confirm Password *"
                                name="confirmPassword"
                                type="password"
                                value={inputs.confirmPassword}
                                onChange={e =>
                                    setInputs({
                                        ...inputs,
                                        [e.currentTarget.name]: e.target.value
                                    })
                                }
                                error={actionData?.fieldErrors?.confirmPassword}
                            />
                        </>
                    )}
                    <FancyButton name="_action" value={frmAction}>
                        {frmAction === "login" ? "LOG IN" : "SIGN UP"}
                    </FancyButton>
                </FancyForm>
            </div>
        </Layout>
    )
}

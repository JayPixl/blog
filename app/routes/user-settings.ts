import { ActionFunction, json } from "@remix-run/node"
import { sendVerifyEmail } from "~/utils/mail.server"
import { updateUserProfile } from "~/utils/profile.server"
import { getUser } from "~/utils/users.server"
import { validateLength } from "~/utils/validators"

export const action: ActionFunction = async ({ request }) => {
    const { user } = await getUser(request, false, true)

    if (!user) return json({ error: true, formError: "Could not find user" })

    const form = await request.formData()

    const action = form.get("_action")!

    let fields = {
        fullName: (form.get("fullName") as string) || "",
        nickname: (form.get("nickname") as string) || "",
        avatarUrl: (form.get("avatarUrl") as string) || ""
    }

    switch (action) {
        case "save": {
            const fieldErrors = {
                fullName: validateLength(fields.fullName, 1, 20),
                nickname: fields.nickname.length
                    ? validateLength(fields.nickname, 1, 5)
                    : false
            }
            if (Object.values(fieldErrors).some(Boolean)) {
                return json({ error: true, fieldErrors })
            } else {
                const { error } = await updateUserProfile(user.id, fields)
                if (error) return json({ error: true, formError: error })

                return json({ success: "Successfully updated profile!" })
            }
        }
        case "email": {
            return json({
                error: true,
                formError: "This feature is not currently available."
            })
        }
        case "reverify": {
            await sendVerifyEmail(
                user?.fullName || "",
                user.email,
                user.verifyCode,
                user.id
            )
            return json({ success: "Verificaiton email successfully sent!" })
        }
        case "password": {
            return json({
                error: true,
                formError: "This feature is not currently available."
            })
        }
        default: {
            return json({ error: true, formError: "Invalid action" })
        }
    }
}

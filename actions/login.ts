"use server"

import { getAccessToken } from "@/utils/lib/server-only"
import { socket } from "@/utils/types/utils"

import { cookies } from "next/headers"

type TSignInState = {
    user: unknown,
    message: string,
    success: boolean | null,
    redirectUrl: string | null
}

export const SignInAction = async (prevState: TSignInState, formData: FormData) => {
    const accessToken = await getAccessToken()

    const USERDATA = {
        email_uname: formData.get("email_uname"),
        password: formData.get("password"),
    }

    const res = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(USERDATA)
    })

    if (!res.ok) {
        const { error } = await res.json()
        return {
            message: error,
            success: false,
            redirectUrl: null,
            user: null
        }
    }

    const { token, user } = await res.json();

    socket.emit("go online", user._id);

    (await cookies()).set("accessToken", token, {
        httpOnly: true,
        path: "/",
    })

    return {
        message: "successfull",
        user: user,
        success: true,
        redirectUrl: "/chats#chat"
    }

}

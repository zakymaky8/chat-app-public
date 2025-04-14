"use server"

import { socket } from "@/utils/types/utils"

import { cookies } from "next/headers"

type TSignInState = {
    user: unknown,
    message: string,
    success: boolean | null,
    redirectUrl: string | null
}

export const SignInAction = async (prevState: TSignInState, formData: FormData) => {

    const USERDATA = {
        email_uname: formData.get("email_uname") as string,
        password: formData.get("password") as string,
    }

    try {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(USERDATA)
        })

        const { success, message, token, user } = await res.json();
        if (success) {
            socket.emit("go online", user._id);
            (await cookies()).set("accessToken", token, {
                httpOnly: true,
                path: "/",
            })
        }
        return {
            message,
            user: user,
            success,
            redirectUrl: "/chats#chat"
        }
    } catch {
        return {
            success: false,
            message: "Error Ocurred!",
            user: null,
            redirectUrl: null,
        }
    }

}

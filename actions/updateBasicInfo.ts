"use server"

import { getAccessToken } from "@/utils/lib/server-only"


export const updateUserInfoAction = async (userId: string, type:string, formdata: FormData) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/${userId}?type=${type}`

    const changeData = type === "basic" ? {
        firstname: formdata.get("firstname") as string,
        lastname: formdata.get("lastname") as string,
        username: formdata.get("username") as string,
        email: formdata.get("email") as string,
    } : {
        old_password: formdata.get("old_password"),
        new_password: formdata.get("new_password"),
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(changeData)
        })

        const { success, message, data } = await response.json();
        return {
            success,
            message,
            redirectUrl: [401, 403].includes(response.status) ? "/login" : null,
            data
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
            data: null
        }
    }

}
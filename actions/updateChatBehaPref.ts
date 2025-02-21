"use server"

import { getAccessToken } from "@/utils/lib/server-only"


export const updateChatBehaviorPref = async (userId: string, selectedUsers: string[], formdata: FormData) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/${userId}?type=behavior`

    const changeData = {
        theme: formdata.get("theme"),
        allowed_chats: formdata.get("allowed_chats"),
        allow_search: formdata.get("allow_search"),
        selectedUsersForChat: selectedUsers
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

        const { success, message } = await response.json();
        return {
            success,
            message,
            redirectUrl: [401, 403].includes(response.status) ? "/login" : null,
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
        }
    }

}
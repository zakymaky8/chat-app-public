"use server"

import { getAccessToken } from "@/utils/lib/server-only"

type TFormState = {
    success: boolean,
    message?: string,
    redirectUrl?: string | null;
}


export const createSelfChat = async (prev: TFormState, formdata: FormData) => {
    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/chats/conversations_with/self`
    const CHATDATA = {
        chat_msg: formdata.get("chat_msg") as string
    }
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "Application/json"
            },
            body: JSON.stringify(CHATDATA)
        })

        const { success, message } = await response.json();

        return { success, message }
    } catch {
        return {
            success: false,
            message: "Error Occured!"
        }
    }
}


export const updateSelfChat = async (chat_id: string, formdata:FormData) => {
    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/chats/conversations_with/self/${chat_id}`

    const CHATDATA = {
        chat_msg: formdata.get("chat_msg") as string
    }
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "content-type": "Application/json"
            },
            body: JSON.stringify(CHATDATA)
        })
        const { success, message } = await response.json();
        return { success, message }
    } catch {
        return {
            success: false,
            message: "Error Occured!"
        }
    }
}
export const deleteSelfChat = async (chat_id: string) => {
    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/chats/conversations_with/self/${chat_id}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })
        const { success, message } = await response.json();
        return { success, message }
    } catch {
        return {
            success: false,
            message: "Error Occured!"
        }
    }
}
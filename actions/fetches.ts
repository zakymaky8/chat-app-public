"use server"

import { getAccessToken } from "@/utils/lib/server-only"



export const commonFetch = async (token: string, url: string) => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const { success, message, data } = await response.json();
        return {
            success: success,
            message: message,
            redirectUrl: [401, 403].includes(response.status) ? "/login" : null,
            data
        }

    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
            data: null,
        }
    }
} 


export const getChattedUsers = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/users`;

    return await commonFetch(token!, url)
}




export const getCurrentUser = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/current_user`;

    return await commonFetch(token!, url)
}

export const getUserSearchResult = async (search_key: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/search?search_key=${search_key}`;

    return await commonFetch(token!, url)
}



export const getConversationByTwo = async (target: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/chats/conversations_with/${target}`;

    return await commonFetch(token!, url)
}


export const getSelfConversations = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/chats/conversations_with/self/me`;

    return await commonFetch(token!, url)
}
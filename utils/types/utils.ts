import { io } from "socket.io-client";

export const getTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};



export type TChats = {
    _id: string,
    createdAt: string,
    updatedAt: string,
    messageText?: string,
    user_id: string,
    chatted_to: string,
    isUpdated: boolean
}


export const socket = io("http://localhost:1234")
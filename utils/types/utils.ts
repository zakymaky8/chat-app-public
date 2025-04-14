import { io } from "socket.io-client";


export type TChats = {
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    messageText?: string,
    replied_to: string | null
    user_id: string,
    chatted_to: string,
    isUpdated: boolean
}


export const socket = io(process.env.API_URL ?? "https://chat-api-0nwh.onrender.com", {
    withCredentials: true,
    transports: ["websocket", "polling"]
})
"use server"

import { socket } from "@/utils/types/utils"
import { cookies } from "next/headers"
import { getCurrentUser } from "./fetches"



export const logout = async () => {
    const {data: {current}} = await getCurrentUser();
    socket.emit("go offline", current._id);
    (await cookies()).delete("accessToken");
}
"use client"

import { useRouter } from "next/navigation"
import { logout } from "@/actions/logout"


const Logout = () => {
    const router = useRouter()
  return (
    <div>
        <button title="logout"
          onClick={async () => {
            await logout()
            router.push("/");
        }} className="text-[11px]  text-[red]  hover:opacity-70">Logout</button>
    </div>

  )
}

export default Logout

import ActiveStatus from "@/components/ActiveStatus";
import { cookies } from "next/headers";
import Link from "next/link";

const SingleUserProfile = async ({params}: {params: Promise<{userId: string}>}) => {
    const { userId } = await params;
    const token = (await cookies()).get("token")?.value
    const res = await fetch(`${process.env.API_URL}/user/${userId}`, {
        headers: {
            "authorization": `Bearer ${token}`,
            "content-type": "application/json"
        }
    })
    if (!res.ok) {
        const { error } = await res.json()
        return <p>{error}</p>
    }
    const { user } = await res.json();
  return (
    <div className="flex flex-col items-center gap-6 p-5 m-6">
        <h4 className="text-3xl">👩🏻‍💼 {user.username}</h4>
        <div className="flex items-center gap-5">
            <ActiveStatus user={user}/>
            <Link className="text-[12px] text-yellow-500 hover:opacity-75" href={`/chats/${user._id}#chats`}>Chat</Link>
        </div>
        <ul className="flex flex-col gap-4 text-black text-lg">
            <li>First Name: <em className="text-black opacity-70">{user.firstName}</em></li>
            <li>Last Name: <em className="text-black opacity-70">{user.lastName}</em></li>
            <li>Email: <em className="text-black opacity-70">{user.email}</em></li>
        </ul>
        <div className="flex flex-col gap-5">
            <h4 className="text-xl">Other Info</h4>
            <p className="italic text-black opacity-70">Searching him/her is: {user.preferences.canTheySearchYou ? "granted" : "not granted"}</p>
            <ul className="flex flex-col items-center gap-4">
                <h5>His chat Friends</h5>
                <li className="italic text-black opacity-70">someone</li>
                <li className="italic text-black opacity-70">someone</li>
                <li className="italic text-black opacity-70">someone</li>
            </ul>
        </div>
    </div>
  )
}

export default SingleUserProfile

import { getCurrentUser } from "@/actions/fetches";
import Settings from "@/components/Settings"
import { redirect } from "next/navigation";

const SettingsPage = async () => {
   const { success, redirectUrl, data: {current} } = await getCurrentUser();

   if (!success && redirectUrl !==null)  {
    redirect(redirectUrl)
}
  return (
    <>
        <Settings user={current} />
    </>
  )
}

export default SettingsPage
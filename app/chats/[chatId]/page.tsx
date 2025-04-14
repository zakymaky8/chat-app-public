
import { getCurrentUser } from "@/actions/fetches";
import Conversations from "@/components/Conversations";

const SingleChat = async (
        {params}: {params: Promise<{chatId: string}>}
  ) => {
    const { data: {current} } = await getCurrentUser()
    const { chatId } = await params;
  return <Conversations chatId={chatId} curUs={current} />
}

export default SingleChat

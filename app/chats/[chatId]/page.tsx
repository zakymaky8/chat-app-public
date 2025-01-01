
import Conversations from "@/components/Conversations";

const SingleChat = async ({params}: {params: {
    chatId: string
}}) => {
    const { chatId } = await params;
  return <Conversations chatId={chatId} />
}

export default SingleChat

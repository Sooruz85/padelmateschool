import { ChatView } from "@/features/messages/chat-view";

type Props = { params: { threadId: string } };

export default function ThreadPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Fil #{params.threadId}</h1>
      <ChatView threadId={params.threadId} />
    </div>
  );
}

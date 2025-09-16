import { ThreadList } from "@/features/messages/thread-list";

export default async function MessagesPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Messages</h1>
      <ThreadList />
    </div>
  );
}

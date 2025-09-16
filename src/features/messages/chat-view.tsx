"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChatView({ threadId }: { threadId: string }) {
  const [messages, setMessages] = useState<Array<{ id: string; content: string; created_at: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`/api/messages?thread=${threadId}`).then((r) => r.json()).then((j) => setMessages(j.messages || []));
  }, [threadId]);

  async function send() {
    const content = inputRef.current?.value?.trim();
    if (!content) return;
    const res = await fetch(`/api/messages`, { method: "POST", body: JSON.stringify({ thread_id: threadId, content }) });
    const json = await res.json();
    if (json.ok) {
      setMessages((m) => [...m, json.message]);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div className="border rounded p-3 h-80 overflow-auto">
        {messages.map((m) => (
          <div key={m.id} className="text-sm mb-2">
            <span className="text-muted-foreground mr-2">{new Date(m.created_at).toLocaleTimeString()}</span>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input ref={inputRef} placeholder="Votre message" />
        <Button type="button" onClick={send}>Envoyer</Button>
      </div>
    </div>
  );
}



import { useState, type FormEvent } from "react";
import { api } from "../api";
import { config } from "../config";
import type { ChatMessage } from "../types";

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: `¡Hola! Soy tu coach${config.brandName ? ` de ${config.brandName}` : ""}. Cuéntame tu nivel, tu objetivo y cuántos días puedes entrenar para armar tu rutina semanal.` },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setThinking(true);
    setError(null);
    try {
      // El primer mensaje es el saludo local: no lo enviamos al modelo.
      const { reply } = await api.askAgent(next.slice(1));
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setThinking(false);
    }
  };

  return (
    <aside className="card chat" aria-labelledby="coach-title">
      <h2 id="coach-title">{config.agentName}</h2>
      <div className="messages" role="log" aria-live="polite" aria-label="Conversación con el coach">
        {messages.map((m, i) => (
          <p key={i} className={`bubble ${m.role}`}>
            {m.content}
          </p>
        ))}
        {thinking && <p className="bubble assistant muted">Pensando…</p>}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <label htmlFor="coach-message">Tu mensaje</label>
      <form onSubmit={send} className="chat-form">
        <input id="coach-message" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Quiero entrenar tres días…" disabled={thinking} />
        <button className="primary" disabled={thinking || !input.trim()}>
          Enviar
        </button>
      </form>
    </aside>
  );
}

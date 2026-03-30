import { useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  initialMessages?: Message[];
}

export default function ChatInterface({
  title = "Chat with Magical Creature",
  subtitle = "Strategic guidance grounded in the Golden Equilibrium framework",
  initialMessages = [],
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current Business Play analysis, I recommend focusing on cash flow optimization before scaling inventory. Your Quick Ratio suggests maintaining a conservative approach while exploring high-margin SKUs.",
        "The Golden Equilibrium framework indicates you're in a transitional phase. Consider batch procurement to preserve liquidity while meeting demand forecasts.",
        "Your Sweet Spot Score suggests room for strategic growth. Focus on high-velocity SKUs and avoid cash-trap inventory items that could compromise your financial readiness.",
        "I see an opportunity to improve your position on the strategy map. The key is balancing offense (opportunity capture) with defense (financial resilience). Start with small, validated inventory bets.",
      ];
      const aiMsg: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="section-header">{title}</h3>
        <p className="text-sm text-muted-foreground mt-3">{subtitle}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setMessages([])}
        className="gap-2"
      >
        <Trash2 className="h-3 w-3" /> Clear Chat
      </Button>

      <div className="card-glass p-0 overflow-hidden">
        <ScrollArea className="h-[400px] p-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
              <p className="text-4xl mb-3">🐪</p>
              <p className="font-medium">Ask me about your Business Play strategy</p>
              <p className="text-sm mt-1">I can advise on inventory, risk, and growth decisions</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 mb-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm shrink-0">
                  🐪
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm shrink-0">
                  👨‍💼
                </div>
              )}
            </div>
          ))}
        </ScrollArea>

        <div className="border-t border-border p-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your strategy..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

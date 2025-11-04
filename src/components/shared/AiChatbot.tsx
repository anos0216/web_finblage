"use client";

import React, { useRef, useEffect } from "react";
import { Bot, Send, X, User, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/useChat"; // Custom hook for chat logic
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { useData } from "@/context/DataContext"; // Import useData

// --- Chat Message Component ---
const ChatMessage = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  const icon = isUser ? (
    <User className="w-5 h-5 text-primary" />
  ) : (
    <Bot className="w-5 h-5 text-primary" />
  );
  return (
    <div
      className={cn(
        "flex items-start gap-3 my-4",
        isUser ? "justify-end" : ""
      )}
    >
      {!isUser && <div className="p-2 rounded-full bg-primary/10">{icon}</div>}
      <div
        className={cn(
          "p-3 rounded-lg max-w-sm",
          isUser ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
        )}
      >
        <div className="prose prose-sm">
          <Markdown>{message}</Markdown>
        </div>
      </div>
      {isUser && <div className="p-2 rounded-full bg-gray-200">{icon}</div>}
    </div>
  );
};

// --- Main AI Chatbot Component ---
const AiChatbot: React.FC = () => {
  // Use global state for visibility
  const { isChatbotOpen, closeChatbot } = useData();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Render nothing if the modal is not open
  if (!isChatbotOpen) {
    return null;
  }

  return (
    <>
      {/* --- Chat Modal --- */}
      <div className="fixed inset-0 bg-black/30 z-[100] flex items-center justify-center">
        <div className="bg-white w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              <h2 className="text-lg font-semibold">AI Assistant</h2>
            </div>
            {/* Use closeChatbot from context */}
            <Button variant="ghost" size="icon" onClick={closeChatbot}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Chat History */}
          <div
            ref={chatContainerRef}
            className="flex-grow p-4 overflow-y-auto"
          >
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                message={m.content}
                isUser={m.role === "user"}
              />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 my-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="p-3 rounded-lg bg-gray-100">
                  <Loader className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a financial question..."
                className="flex-grow p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChatbot;
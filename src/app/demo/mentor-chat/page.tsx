'use client';

import {useState} from 'react';
import {
  aiMentorChat,
  type AIMentorChatInput,
  type AIMentorChatOutput,
} from '@/ai/flows/ai-mentor-chat';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Loader2, Send, Bot, User} from 'lucide-react';
import {ScrollArea} from '@/components/ui/scroll-area';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function MentorChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {role: 'user', content: input};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response: AIMentorChatOutput = await aiMentorChat({query: input} as AIMentorChatInput);
      const assistantMessage: ChatMessage = {role: 'assistant', content: response.response};
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error with AI Mentor Chat:', error);
      const errorMessage: ChatMessage = {role: 'assistant', content: 'Sorry, something went wrong. Please try again.'};
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 h-[calc(100vh-4rem)] flex flex-col">
      <Card className="max-w-3xl mx-auto w-full flex flex-col flex-1">
        <CardHeader>
          <CardTitle>AI Mentor Chat</CardTitle>
          <CardDescription>
            Ask anything, from "Find me cybersecurity scholarships in Finland" to "Critique my SoP".
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4 -mr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}>
                  {message.role === 'assistant' && (
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <div className="p-2 bg-accent/10 rounded-full">
                      <User className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              ))}
               {loading && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                       <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                       <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask your AI mentor..."
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

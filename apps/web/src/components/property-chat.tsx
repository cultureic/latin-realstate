'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface PropertyChatProps {
    property: {
        title: string;
        description: string;
        location: string;
        price: any;
        features?: any;
    };
}

export function PropertyChat({ property }: PropertyChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: `Hello! I'm your AI assistant for ${property.title}. How can I help you learn more about this property?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg,
                    history: messages,
                    propertyContext: {
                        title: property.title,
                        description: property.description,
                        location: property.location,
                        price: property.price,
                        features: property.features
                    }
                })
            });

            if (!response.ok) throw new Error('Chat failed');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] bg-card border rounded-lg overflow-hidden shadow-lg border-primary/20 bg-gradient-to-b from-card to-muted/30">
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between border-b">
                <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5" />
                    <span className="font-serif font-bold">Property AI Guide</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">Powered by LLM</div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                                ? 'bg-secondary text-secondary-foreground rounded-tr-none'
                                : 'bg-muted border border-border/50 text-foreground rounded-tl-none'
                            }`}>
                            <div className="flex items-center space-x-2 mb-1 opacity-50">
                                {m.role === 'assistant' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                <span className="text-[10px] font-bold uppercase tracking-tight">{m.role}</span>
                            </div>
                            <p className="leading-relaxed">{m.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-muted p-4 rounded-2xl rounded-tl-none animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-card border-t border-border/50">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center space-x-2 bg-muted/50 p-1 rounded-full border border-border/50 focus-within:border-primary/50 transition-colors"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about the property..."
                        className="flex-1 bg-transparent px-4 py-2 text-sm outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
